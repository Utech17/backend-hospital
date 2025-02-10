import { BuyDetailsDB } from "../config";
import { BuyDetailsInterface, BuyDetailsCreationInterface } from "../interfaces";

const BuyDetailsServices = {
  getAll: async () => {
    try {
      const detalleCompras = await BuyDetailsDB.findAll();

      if (detalleCompras.length === 0) {
        return {
          message: "No se encontraron registros",
          status: 404,
          data: { detalleCompras },
        };
      }

      return {
        message: "Registros encontrados",
        status: 200,
        data: { detalleCompras },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte al administrador: error",
        status: 500,
      };
    }
  },

  getByCompositeKey: async (id_compra: number, id_producto: number) => {
    try {
      const detalleCompra = await BuyDetailsDB.findOne({
        where: { id_compra, id_producto },
      });

      if (!detalleCompra) {
        return {
          message: "Registro no encontrado",
          status: 404,
          data: {},
        };
      }

      return {
        message: "Registro encontrado",
        status: 200,
        data: { detalleCompra },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte al administrador: error",
        status: 500,
      };
    }
  },

  create: async (data: BuyDetailsCreationInterface) => {
    try {
      const detalleCompra = await BuyDetailsDB.create(data);
      return {
        message: "Creación exitosa",
        status: 201,
        data: { detalleCompra },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Contacte con el administrador: error",
        status: 500,
      };
    }
  },

  update: async (id_compra: number, id_producto: number, data: Partial<BuyDetailsInterface>) => {
    try {
      const [rowsUpdated] = await BuyDetailsDB.update(data, {
        where: { id_compra, id_producto },
      });

      if (rowsUpdated === 0) {
        return {
          message: "Registro no encontrado o sin cambios",
          status: 404,
          data: {},
        };
      }

      const updatedDetalleCompra = await BuyDetailsDB.findOne({
        where: { id_compra, id_producto },
      });

      return {
        message: "Actualización exitosa",
        status: 200,
        data: { detalleCompra: updatedDetalleCompra },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Contacte con el administrador: error",
        status: 500,
      };
    }
  },

  delete: async (id_compra: number, id_producto: number) => {
    try {
      const result = await BuyDetailsDB.destroy({
        where: { id_compra, id_producto },
      });

      if (result === 0) {
        return {
          message: "Registro no encontrado",
          status: 404,
          data: {},
        };
      }

      return {
        message: "Eliminación exitosa",
        status: 200,
        data: { detalleCompra: null },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Contacte con el administrador: error",
        status: 500,
      };
    }
  },

  findByPurchaseId: async (id_compra: number) => {
    try {
      const detallesCompra = await BuyDetailsDB.findAll({
        where: { id_compra },
      });

      if (detallesCompra.length === 0) {
        return {
          message: "No se encontraron registros",
          status: 404,
          data: {},
        };
      }

      return {
        message: "Registros encontrados",
        status: 200,
        data: { detallesCompra },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Contacte con el administrador: error",
        status: 500,
      };
    }
  },
};

export { BuyDetailsServices };