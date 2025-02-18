import { 
  db, BillingDB, BillingDetailDB, ProductDB, 
  SaleDB, RequestDB, AccountRecordDB,
  JournalDB, AccountDB, PaymentTypeDB, PatientDB, ClientDB
} from "../config";
import { 
  BillingInterface, BillingDetailInterface,
  SaleInterface, RequestInterface, AccountRecordInterface 
} from "../interfaces";
import { calculateBalance } from "../helpers";
import { Op } from "sequelize";

const BillingServices = {
  getAll: async () => {
    try {
      const bills = await BillingDB.findAll({
        include: [
          { 
            model: BillingDetailDB,
            as: 'billing_details',
            required: false,
            include: [
              {
                model: ProductDB
              }
            ]
          },
          {
            model: SaleDB,
            as: 'sale',
            required: false,
            include: [
              {
                model: PaymentTypeDB
              }
            ]
          },
          {
            model: PatientDB
          },
          {
            model: ClientDB
          }
        ],
        where: {
          
        }
      });

      if (bills.length === 0) {
        return {
          message: `No se encontraron facturas`,
          status: 404,
          data: { bills },
        };
      }

      return {
        message: `Facturas encontradas correctamente`,
        status: 200,
        data: { bills },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const bill = await BillingDB.findOne({
        where: { 
          num_fact: id,
          deletedAt: null
        },
        include: [
          { 
            model: BillingDetailDB,
            as: 'billing_details',
            where: {
              num_fact: id
            },
            required: false,
            include: [
              {
                model: ProductDB
              }
            ]
          },
          {
            model: SaleDB,
            as: 'sale',
            where: {
              invoice_number: id
            },
            required: false,
            include: [
              {
                model: PaymentTypeDB
              }
            ]
          },
          {
            model: PatientDB
          },
          {
            model: ClientDB
          }
        ]
      });

      if (!bill) {
        return {
          message: `Factura no encontrada`,
          status: 404,
          data: {},
        };
      }

      return {
        message: `Factura encontrada`,
        status: 200,
        data: { bill },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (
    data: Partial<BillingInterface>, 
    BillingDetails: BillingDetailInterface[],
    payment_type_id: number = 1
  ) => {
    const transaction = await db.transaction();
    try {

      // 1. Validaciones iniciales
      if (!data.patient_id || !data.client_id) {
        await transaction.rollback();
        return {
          message: `Faltan datos requeridos: patient_id y client_id son obligatorios`,
          status: 400,
        };
      }

      // 2. Validar paciente y cliente
      const [patient, client] = await Promise.all([
        PatientDB.findOne({
          where: { 
            id: data.patient_id,
            deletedAt: null
          }
        }),
        ClientDB.findOne({
          where: { 
            id: data.client_id,
            deletedAt: null
          }
        })
      ]);

      if (!patient || !client) {
        await transaction.rollback();
        return {
          message: !patient 
            ? `El paciente con ID ${data.patient_id} no existe`
            : `El cliente con ID ${data.client_id} no existe`,
          status: 404,
        };
      }

      // 3. Validar productos
      if (!BillingDetails?.length) {
        await transaction.rollback();
        return {
          message: `Debe incluir al menos un producto en la factura`,
          status: 400,
        };
      }

      // Validar productos en paralelo
      const productPromises = BillingDetails.map(detail => 
        ProductDB.findOne({
          where: { 
            id: detail.product_id,
            status: "active"
          }
        })
      );

      const products = await Promise.all(productPromises);
      
      const invalidProduct = products.findIndex(p => !p);
      if (invalidProduct !== -1) {
        await transaction.rollback();
        return {
          message: `El producto con ID ${BillingDetails[invalidProduct].product_id} no existe o está inactivo`,
          status: 404,
        };
      }

      // 4. Crear factura
      const bill = await BillingDB.create(data, { transaction });

      if (!bill?.dataValues?.num_fact) {
        await transaction.rollback();
        return {
          message: `Error al crear la factura: número de factura no generado`,
          status: 500,
        };
      }

      // 5. Crear detalles y calcular total
      const billDetails = BillingDetails.map(detail => ({
        ...detail,
        num_fact: bill.dataValues.num_fact
      }));

      await BillingDetailDB.bulkCreate(billDetails as any[], { transaction });

      const totalAmount = BillingDetails.reduce((sum, detail) => 
        sum + (Number(detail.quantity) * Number(detail.price)), 0
      );

      // 6. Actualizar inventario
      await Promise.all(BillingDetails.map(detail =>
        ProductDB.update(
          { quantity: db.literal(`quantity - ${detail.quantity}`) },
          { 
            where: { id: detail.product_id },
            transaction 
          }
        )
      ));

      // 7. Crear venta
      const sale = await SaleDB.create({
        invoice_number: bill.dataValues.num_fact,
        date: new Date(),
        amount: totalAmount,
        payment_type_id,
        status: true,
        updatedAt: new Date()
      }, { transaction });

      if (!sale?.dataValues?.id) {
        await transaction.rollback();
        return {
          message: `Error al crear la venta`,
          status: 500,
        };
      }

      // 8. Crear solicitud financiera
      const request_db = await RequestDB.create({
        request_type_id: 2,
        description: `Venta al contado - Factura #${bill.dataValues.num_fact}`,
        amount: totalAmount,
        status: "aprobada"
      }, { transaction });

      if (!request_db?.dataValues?.request_id) {
        await transaction.rollback();
        return {
          message: `Error al crear la solicitud financiera`,
          status: 500,
          debug: { request_db }
        };
      }

      // 9. Crear los asientos contables según el tipo de pago
      let accountDescription = "";
      let debitAccountId = 1;

      switch (payment_type_id) {
        case 1: // Efectivo
          accountDescription = "Caja Principal";
          debitAccountId = 1;
          break;
        case 2: // Tarjeta de Crédito
          accountDescription = "Cuenta por Cobrar - Tarjetas de Crédito";
          debitAccountId = 2;
          break;
        case 3: // Transferencia Bancaria
          accountDescription = "Banco Principal";
          debitAccountId = 1;
          break;
        case 8: // Tarjeta de Débito
          accountDescription = "Banco Principal";
          debitAccountId = 1;
          break;
        case 5: // Billetera Digital
        case 6: // Pago Móvil
        case 9: // PayPal
          accountDescription = "Cuentas Digitales";
          debitAccountId = 3;
          break;
        default:
          accountDescription = "Caja Principal";
          debitAccountId = 1;
      }

      const accounts_records: Partial<AccountRecordInterface>[] = [
        {
          account_id: debitAccountId,
          name: accountDescription,
          type: "debe",
          amount: totalAmount,
          description: `Venta al contado - ${accountDescription} - Factura #${bill.dataValues.num_fact}`,
        },
        {
          account_id: 4, // Ventas (ingreso)
          name: "Ingresos por Ventas",
          type: "haber",
          amount: totalAmount,
          description: `Registro de Venta al contado - Factura #${bill.dataValues.num_fact}`,
        }
      ];

      // 10. Procesar registros contables
      for (const recordData of accounts_records) {
        try {
          // Crear registro contable
          const account_record_db = await AccountRecordDB.create(recordData, { transaction });

          if (!account_record_db?.dataValues?.id) {
            throw new Error('Error al crear el registro contable');
          }

          // Actualizar balance
          const account_db = await AccountDB.findOne({ 
            where: { id: recordData.account_id },
            transaction 
          });

          if (!account_db) {
            throw new Error(`Cuenta contable ${recordData.account_id} no encontrada`);
          }

          const balance = calculateBalance(
            account_db.dataValues.type_account || "",
            recordData.amount!,
            recordData.type!,
            account_db.dataValues.balance || 0
          );

          await AccountDB.update(
            { balance },
            { 
              where: { id: recordData.account_id },
              transaction 
            }
          );

          // Crear asiento en journal
          const journalData = {
            request_id: request_db.dataValues.request_id,
            account_record_id: account_record_db.dataValues.id,
            status: true,
            updatedAt: new Date()
          };

          const journal = await JournalDB.create(journalData, { transaction });

          if (!journal?.dataValues?.id) {
            throw new Error('Error al crear el asiento en el journal');
          }

        } catch (error) {
          console.error('Error en proceso contable:', error);
          await transaction.rollback();
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          return {
            message: `Error en proceso contable: ${errorMessage}`,
            status: 500,
            debug: { error }
          };
        }
      }

      await transaction.commit();

      return {
        message: `Factura creada exitosamente`,
        status: 201,
        data: {
          bill,
          billing_details: billDetails,
          sale,
          request: request_db,
        },
      };

    } catch (error) {
      await transaction.rollback();
      console.error('Error general:', error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
        debug: { error }
      };
    }
  },

  update: async (
    id: number, 
    data: any  // Cambiado para manejar la estructura completa
  ) => {
    const transaction = await db.transaction();
    try {
      // 1. Validar que la factura existe
      const bill = await BillingDB.findOne({
        where: { num_fact: id },
        include: [
          { 
            model: BillingDetailDB,
            as: 'billing_details'
          },
          {
            model: SaleDB,
            as: 'sale'
          }
        ],
        transaction
      }) as any;

      if (!bill) {
        await transaction.rollback();
        return {
          message: `Factura #${id} no encontrada`,
          status: 404,
          data: {}
        };
      }

      if (bill.deletedAt) {
        await transaction.rollback();
        return {
          message: `La factura #${id} ya se encuentra eliminada`,
          status: 400,
          data: {}
        };
      }

      // 2. Actualizar factura principal
      const billData = {
        patient_id: data.patient_id,
        billing_date: data.billing_date,
        billing_status: data.billing_status,
        client_id: data.client_id,
        updatedAt: new Date()
      };

      await BillingDB.update(billData, { 
        where: { num_fact: id },
        transaction 
      });

      // 3. Actualizar detalles si se proporcionan
      if (data.BillingDetails && Array.isArray(data.BillingDetails)) {
        for (const detail of data.BillingDetails) {
          const [billingDetail] = await BillingDetailDB.findOrCreate({
            where: { 
              num_fact: id,
              product_id: detail.product_id
            },
            defaults: {
              ...detail,
              num_fact: id,
              updatedAt: new Date()
            },
            transaction
          });

          if (billingDetail) {
            await BillingDetailDB.update(
              {
                quantity: detail.quantity,
                price: detail.price,
                updatedAt: new Date()
              },
              {
                where: { 
                  num_fact: id,
                  product_id: detail.product_id
                },
                transaction
              }
            );
          }

          // Actualizar inventario
          await ProductDB.update(
            { quantity: db.literal(`quantity - ${detail.quantity}`) },
            { 
              where: { id: detail.product_id },
              transaction 
            }
          );
        }

        // Calcular nuevo total
        const totalAmount = data.BillingDetails.reduce(
          (sum: number, detail: { quantity: number; price: number }) => 
            sum + (Number(detail.quantity) * Number(detail.price)), 
          0
        );

        // Actualizar venta
        await SaleDB.update(
          {
            amount: totalAmount,
            payment_type_id: data.payment_type_id,
            updatedAt: new Date()
          },
          {
            where: { invoice_number: id },
            transaction
          }
        );
      }

      await transaction.commit();

      // Obtener datos actualizados
      const updatedBill = await BillingServices.getOne(id);

      return {
        message: `Factura actualizada exitosamente`,
        status: 200,
        data: updatedBill.data
      };
    } catch (error) {
      await transaction.rollback();
      console.error('Error al actualizar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        message: `Error al actualizar la factura: ${errorMessage}`,
        status: 500,
        debug: { error }
      };
    }
  },

  delete: async (id: number) => {
    const transaction = await db.transaction();
    try {
      const bill = await BillingDB.findOne({
        where: { num_fact: id },
        include: [
          { 
            model: BillingDetailDB,
            as: 'billing_details'
          },
          {
            model: SaleDB,
            as: 'sale'
          }
        ],
        transaction
      }) as any;

      if (!bill) {
        await transaction.rollback();
        return {
          message: `Factura #${id} no encontrada`,
          status: 404,
          data: {}
        };
      }

      if (bill.deletedAt) {
        await transaction.rollback();
        return {
          message: `La factura #${id} ya se encuentra eliminada`,
          status: 400,
          data: {}
        };
      }

      // Buscar la solicitud relacionada
      const request = await RequestDB.findOne({
        where: { 
          description: { [Op.like]: `%Factura #${id}%` }
        },
        transaction
      }) as any;

      const now = new Date();

      // Eliminar factura y relacionados
      await Promise.all([
        BillingDB.update(
          { deletedAt: now, status: "cancelado" },
          { where: { num_fact: id }, transaction }
        ),
        BillingDetailDB.update(
          { deletedAt: now },
          { where: { num_fact: id }, transaction }
        ),
        SaleDB.update(
          { deletedAt: now, status: false },
          { where: { invoice_number: id }, transaction }
        ),
        RequestDB.update(
          { status: "rechazada" },
          { where: { description: { [Op.like]: `%Factura #${id}%` } }, transaction }
        ),
        AccountRecordDB.update(
          { status: false },
          { where: { description: { [Op.like]: `%Factura #${id}%` } }, transaction }
        ),
        JournalDB.update(
          { 
            deletedAt: now,
            status: false 
          },
          { 
            where: { 
              request_id: request?.dataValues?.request_id 
            }, 
            transaction 
          }
        )
      ]);

      await transaction.commit();

      return {
        message: `Factura eliminada exitosamente`,
        status: 200,
        data: {},
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },
};

export { BillingServices };