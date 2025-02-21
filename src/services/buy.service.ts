import { BuyDB, RequestDB, BuyDetailsDB, db, DepartmentDB, SupplierDB, AccountRecordDB, AccountDB, JournalDB } from "../config";
import { calculateBalance } from "../helpers";
import { AccountRecordInterface, BuyInterface } from "../interfaces";
import { Model } from "sequelize";

const BuyServices = {
  getAll: async () => {
      try {
          const buys = await BuyDB.findAll({
              where: {
                  
              },
              include: [
                  { model: BuyDetailsDB },
                  { model: DepartmentDB },
                  { model: SupplierDB }
              ]
          });

          if (buys.length === 0) {
              return {
                  message: `No se encontraron registros`,
                  status: 404,
                  data: {
                      buys,
                  },
              };
          }

          return {
              message: `¡Compras encontradas exitosamente!`,
              status: 200,
              data: {
                  buys,
              },
          };
      } catch (error) {
          console.error(error);
          return {
              message: `Contacta con el administrador`,
              status: 500,
          };
      }
  },

  getOne: async (id: number | string) => {
      try {
          const buy = await BuyDB.findOne({
              where: {
                  id,
              },
              include: [
                  { model: BuyDetailsDB },
                  { model: DepartmentDB },
                  { model: SupplierDB }
              ]
          });

          if (!buy) {
              return {
                  message: `Compra no encontrada`,
                  status: 404,
                  data: {},
              };
          }

          return {
              message: `Compra encontrada exitosamente`,
              status: 200,
              data: {
                  buy,
              },
          };
      } catch (error) {
          console.error(error);
          return {
              message: `Contacta con el administrador`,
              status: 500,
          };
      }
  },

  create: async (data: BuyInterface) => {
      const transaction = await db.transaction();
      try {
          // Validar que exista el departamento
          const department = await DepartmentDB.findByPk(data.department_id);
          if (!department) {
              return {
                  message: `El departamento no existe`,
                  status: 404,
                  data: {}
              };
          }

          const buy = await BuyDB.create(
              {
                  supplier_id: data.supplier_id,
                  department_id: data.department_id,
                  invoice_number: data.invoice_number,
                  date: data.date,
                  status: "pendiente",
                  buy_details: data.buy_details,
              },
              {
                  include: [{ model: BuyDetailsDB }],
                  transaction,
              }
          );

          // Calcular monto total
          let amount = 0.0;
          if (data.buy_details) {
              for (const detail of data.buy_details) {
                  amount += detail.quantity * detail.buy_price;
              }
          }

          // Crear solicitud asociada
          const request = await RequestDB.create(
              {
                  request_type_id: 3, // Tipo predefinido para compras
                  description: `Solicitud de Compra #${data.invoice_number}`,
                  amount,
                  status: "pendiente",
              },
              {
                  transaction,
              }
          );

          await transaction.commit();

          return {
              message: `¡Compra registrada exitosamente!`,
              status: 201,
              data: {
                  buy,
                  request
              },
          };
      } catch (error) {
          await transaction.rollback();
          console.error(error);
          return {
              message: `Contacta con el administrador`,
              status: 500,
          };
      }
  },

  update: async (data: Partial<BuyInterface>, id: number | string) => {
    const transaction = await db.transaction();
    try {
      // Actualizar la compra principal
      await BuyDB.update(
        { 
          supplier_id: data.supplier_id,
          department_id: data.department_id,
          invoice_number: data.invoice_number,
          date: data.date,
          status: data.status,
          updatedAt: new Date()
        }, 
        { 
          where: { id },
          transaction 
        }
      );
  
      // Si hay nuevos detalles, actualizar los detalles
      if (data.buy_details && data.buy_details.length > 0) {
        // Eliminar los detalles anteriores
        await BuyDetailsDB.destroy({
          where: { buy_id: id },
          transaction
        });
  
        // Crear los nuevos detalles
        const detailsToCreate = data.buy_details.map(detail => ({
          ...detail,
          buy_id: id
        }));
  
        await BuyDetailsDB.bulkCreate(detailsToCreate, { transaction });
      }
  
      // Si el estado es "aprobado", generar la lógica de finanzas
      if (data.status === "aprobada") {
        // Calcular monto total
        let totalAmount = 0.0;
        if (data.buy_details) {
          for (const detail of data.buy_details) {
            totalAmount += detail.quantity * detail.buy_price;
          }
        }
  
        // Crear solicitud financiera
        const request = await RequestDB.create(
          {
            request_type_id: 3, // Tipo predefinido para compras
            description: `Solicitud de Compra #${data.invoice_number}`,
            amount: totalAmount,
            status: "aprobada",
          },
          {
            transaction,
          }
        );
  
        // Crear los asientos contables
        const accounts_records: Partial<AccountRecordInterface>[] = [
          {
            account_id: 1, // Cuenta de inventario
            name: "Inventario",
            type: "debe",
            amount: totalAmount,
            description: `Compra aprobada - Inventario - Compra #${data.invoice_number}`,
          },
          {
            account_id: 2, // Cuenta de cuentas por pagar
            name: "Cuentas por Pagar",
            type: "haber",
            amount: totalAmount,
            description: `Registro de Compra aprobada - Compra #${data.invoice_number}`,
          }
        ];
  
        // Procesar registros contables
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
              request_id: request.dataValues.request_id,
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
      }
  
      await transaction.commit();
          
      const { data: buyData } = await BuyServices.getOne(id);
  
      return {
        message: `¡Compra actualizada exitosamente!`,
        status: 200,
        data: {
          buy: buyData?.buy,
        },
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Contacta con el administrador`,
        status: 500,
      };
    }
  },

  delete: async (id: number | string) => {
    const transaction = await db.transaction();
    try {
      const buy = await BuyDB.findByPk(id) as Model & BuyInterface;
  
      if (!buy) {
        return {
          message: `La compra no existe`,
          status: 404,
          data: {}
        };
      }
  
      if (buy.status === "rechazada") {
        return {
          message: `La compra ya se encuentra rechazada`,
          status: 400,
          data: {}
        };
      }
  
      // Actualizar la compra a rechazada
      await BuyDB.update(
        {
          status: "rechazada",
          deletedAt: new Date(),
        },
        { 
          where: { id },
          transaction
        }
      );
  
      // Buscar y eliminar la solicitud asociada
      await RequestDB.destroy(
        {
          where: {
            description: `Solicitud de Compra #${buy.invoice_number}`
          },
          transaction
        }
      );
  
      await transaction.commit();
      
      return {
        message: `¡Compra rechazada exitosamente!`,
        status: 200,
        data: {},
      };
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return {
        message: `Contacta con el administrador`,
        status: 500,
      };
    }
  }
};

export { BuyServices };