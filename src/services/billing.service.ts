import { BillingDB } from "../config";
import { BillingInterface } from "../interfaces";

const BillingServices = {
  getAll: async () => {
    try {
      const bills = await BillingDB.findAll();
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
      const bill = await BillingDB.findOne({ where: { id } });
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

  create: async (data: Partial<BillingInterface>) => {
    try {
      const bill = await BillingDB.create({ ...data });
      return {
        message: `Factura creada exitosamente`,
        status: 201,
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

  update: async (id: number, data: Partial<BillingInterface>) => {
    try {
      await BillingDB.update(data, { where: { id } });
      const { data: updatedData } = await BillingServices.getOne(id);
      return {
        message: `Factura actualizada exitosamente`,
        status: 200,
        data: {
          bill: updatedData?.bill,
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

  delete: async (id: number) => {
    try {
      await BillingDB.destroy({ where: { id } });
      return {
        message: `Factura eliminada exitosamente`,
        status: 204,
        data: {},
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },
};

export { BillingServices };