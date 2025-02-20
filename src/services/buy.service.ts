import { BuyDB, RequestDB, BuyDetailsDB, db, DepartmentDB, SupplierDB, ProductDB } from "../config";
import { BuyInterface } from "../interfaces";
import { Model } from "sequelize";

const BuyServices = {
  getAll: async () => {
      try {
          const buys = await BuyDB.findAll({
              include: [
                  { 
                      model: BuyDetailsDB,
                      include: [{
                          model: ProductDB,
                          attributes: ['id', 'name', 'description']
                      }],
                      attributes: ['id', 'quantity', 'buy_price', 'product_id']
                  },
                  { 
                      model: DepartmentDB,
                      attributes: ['id', 'name', 'description']
                  },
                  { 
                      model: SupplierDB,
                      attributes: ['id', 'name', 'rif', 'phone', 'address']
                  }
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
              where: { id },
              include: [
                  { 
                      model: BuyDetailsDB,
                      include: [{
                          model: ProductDB,
                          attributes: ['id', 'name', 'description']
                      }],
                      attributes: ['id', 'quantity', 'buy_price', 'product_id']
                  },
                  { 
                      model: DepartmentDB,
                      attributes: ['id', 'name', 'description']
                  },
                  { 
                      model: SupplierDB,
                      attributes: ['id', 'name', 'rif', 'phone', 'address']
                  }
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
                  createdAt: new Date(),
                  buy_details: data.buy_details,
              },
              {
                  include: [{ 
                      model: BuyDetailsDB,
                      include: [{
                          model: ProductDB,
                          attributes: ['id', 'name', 'description']
                      }]
                  }],
                  transaction,
              }
          );

          // Calcular monto total
          let amount = data.buy_details?.reduce((total, detail) => {
              const detailAmount = detail.quantity * detail.buy_price;
              return total + detailAmount;
          }, 0.0) || 0.0;

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

        // Buscar y actualizar la solicitud asociada
        await RequestDB.update(
            {
                status: "rechazada",
                updatedAt: new Date()
            },
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