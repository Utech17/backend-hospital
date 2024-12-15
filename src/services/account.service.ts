import { AccountDB } from "../config";
import { AccountInterface } from "../interfaces";

const AccountServices = {
  getAll: async () => {
    try {
      const accounts = await AccountDB.findAll();
      if (accounts.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            accounts,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          accounts,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  getOne: async (id: number) => {
    try {
      const account = await AccountDB.findOne({
        where: { id },
      });
      if (!account) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Registro encontrado`,
        status: 200,
        data: {
          account,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  create: async (data: Partial<AccountInterface>) => {
    try {
      const account = await AccountDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          account,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  update: async (id: number, data: Partial<AccountInterface>) => {
    try {
      const account = await AccountDB.update(data, { where: { id } });
      const { data: updatedData } = await AccountServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          account: updatedData?.account,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  delete: async (id: number) => {
    try {
      const account = await AccountDB.destroy({ where: { id } });
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          account,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
};

export { AccountServices };