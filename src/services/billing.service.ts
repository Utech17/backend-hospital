import { db, BillingDB, InvoiceDetailDB } from "../config";
import { BillingInterface, InvoiceDetailInterface } from "../interfaces";

const BillingServices = {
  getAll: async () => {
    try {
      const bills = await BillingDB.findAll({
        include: [{ model: InvoiceDetailDB, as: 'InvoiceDetails' }]
      });
      if (bills.length === 0) {
        return {
          message: `No se encontraron facturas`,
          status: 404,
          data: {
            bills,
          },
        };
      }
      return {
        message: `Facturas encontradas correctamente`,
        status: 200,
        data: {
          bills,
        },
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
        where: { id },
        include: [{ model: InvoiceDetailDB, as: 'InvoiceDetails' }]
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
        data: {
          bill,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<BillingInterface>, invoiceDetails: InvoiceDetailInterface[]) => {
    const transaction = await db.transaction();
    try {
      const bill = await BillingDB.create({ ...data }, { transaction });

      if (invoiceDetails && Array.isArray(invoiceDetails)) {
        const billDetails = invoiceDetails.map(detail => ({
          ...detail,
          num_fact: bill.dataValues.id,
        }));

        await InvoiceDetailDB.bulkCreate(billDetails, { transaction });
      }

      await transaction.commit();

      return {
        message: `Factura creada exitosamente`,
        status: 201,
        data: {
          bill,
        },
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

  update: async (id: number, data: Partial<BillingInterface>, invoiceDetails: InvoiceDetailInterface[]) => {
    const transaction = await db.transaction();
    try {
      await BillingDB.update(data, { where: { id }, transaction });

      await InvoiceDetailDB.destroy({ where: { num_fact: id }, transaction });

      if (invoiceDetails && Array.isArray(invoiceDetails)) {
        const billDetails = invoiceDetails.map(detail => ({
          ...detail,
          num_fact: id,
        }));

        await InvoiceDetailDB.bulkCreate(billDetails, { transaction });
      }

      await transaction.commit();
      const { data: updatedData } = await BillingServices.getOne(id);

      return {
        message: `Factura actualizada exitosamente`,
        status: 200,
        data: {
          bill: updatedData?.bill,
        },
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

  delete: async (id: number) => {
    const transaction = await db.transaction();
    try {
      await InvoiceDetailDB.destroy({ where: { num_fact: id }, transaction });

      await BillingDB.destroy({ where: { id }, transaction });

      await transaction.commit();

      return {
        message: `Factura eliminada exitosamente`,
        status: 204,
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