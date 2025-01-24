import { BuyDetailsDB } from "../config";
import { BuyDetailsInterface, BuyDetailsCreationInterface} from "../interfaces";

const BuyDetailsServices = {
  getAll: async () => {
    try {
      const detalleCompras = await BuyDetailsDB.findAll();

      if (detalleCompras.length === 0) {
        return {
          message: "Records not found",
          status: 404,
          data: {
            detalleCompras,
          },
        };
      }

      return {
        message: "Records found",
        status: 200,
        data: {
          detalleCompras,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },

  getByCompositeKey: async (id_compra: number, id_producto: number) => {
    try {
      const detalleCompra = await BuyDetailsDB.findOne({
        where: {
          id_compra,
          id_producto,
        },
      });

      if (!detalleCompra) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        };
      }

      return {
        message: "Record found",
        status: 200,
        data: {
          detalleCompra,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },

  create: async (data: BuyDetailsCreationInterface) => {
    try {
      const detalleCompra = await BuyDetailsDB.create(data);
      return {
        message: "Successful creation",
        status: 201,
        data: {
          detalleCompra,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },

  update: async (id_compra: number, id_producto: number, data: Partial<BuyDetailsInterface>) => {
    try {
      const detalleCompra = await BuyDetailsDB.update(data, {
        where: {
          id_compra,
          id_producto,
        },
      });

      if (detalleCompra[0] === 0) {
        return {
          message: "Record not found or no changes made",
          status: 404,
          data: {},
        };
      }

      const updatedDetalleCompra = await BuyDetailsDB.findOne({
        where: { id_compra, id_producto },
      });

      return {
        message: "Successful update",
        status: 200,
        data: {
          detalleCompra: updatedDetalleCompra,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },

  delete: async (id_compra: number, id_producto: number) => {
    try {
      const result = await BuyDetailsDB.destroy({
        where: {
          id_compra,
          id_producto,
        },
      });

      if (result === 0) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        };
      }

      return {
        message: "Successful deletion",
        status: 204,
        data: {},
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Contact the administrator: error",
        status: 500,
      };
    }
  },
};

export { BuyDetailsServices };