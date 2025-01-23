import { BillingDetailDB } from "../config";
import { BillingDetailInterface } from "../interfaces";

const BillingDetailServices = {
  getAll: async () => {
    try {
      const details = await BillingDetailDB.findAll();
      if (details.length === 0) {
        return {
          message: `No se encontraron detalles de facturas`,
          status: 404,
          data: { details },
        };
      }
      return {
        message: `Detalles de facturas encontrados correctamente`,
        status: 200,
        data: { details },
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
      const detail = await BillingDetailDB.findOne({ where: { id } });
      if (!detail) {
        return {
          message: `Detalle de factura no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Detalle de factura encontrado`,
        status: 200,
        data: { detail },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<BillingDetailInterface>) => {
    try {
      const detail = await BillingDetailDB.create({ ...data });
      return {
        message: `Detalle de factura creado exitosamente`,
        status: 201,
        data: { detail },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<BillingDetailInterface>) => {
    try {
      await BillingDetailDB.update(data, { where: { id } });
      const { data: updatedData } = await BillingDetailServices.getOne(id);
      return {
        message: `Detalle de factura actualizado exitosamente`,
        status: 200,
        data: { detail: updatedData?.detail },
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
      await BillingDetailDB.destroy({ where: { id } });
      return {
        message: `Detalle de factura eliminado exitosamente`,
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

export { BillingDetailServices };