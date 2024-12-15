import { RequestTypeDB } from "../config";
import { RequestTypeInterface } from "../interfaces";

const RequestTypeServices = {
  getAll: async () => {
    try {
      const requestTypes = await RequestTypeDB.findAll();
      if (requestTypes.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            requestTypes,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          requestTypes,
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
      const requestType = await RequestTypeDB.findOne({
        where: { id },
      });
      if (!requestType) {
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
          requestType,
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
  create: async (data: Partial<RequestTypeInterface>) => {
    try {
      const requestType = await RequestTypeDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          requestType,
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
  update: async (id: number, data: Partial<RequestTypeInterface>) => {
    try {
      const requestType = await RequestTypeDB.update(data, { where: { id } });
      const { data: updatedData } = await RequestTypeServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          requestType: updatedData?.requestType,
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
      const requestType = await RequestTypeDB.destroy({ where: { id } });
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          requestType,
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

export { RequestTypeServices };