import { RequestDB } from "../config";
import { RequestInterface } from "../interfaces";

const RequestServices = {
  getAll: async () => {
    try {
      const requests = await RequestDB.findAll();
      if (requests.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            requests,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          requests,
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
      const request = await RequestDB.findOne({
        where: { id },
      });
      if (!request) {
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
          request,
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
  create: async (data: Partial<RequestInterface>) => {
    try {
      const request = await RequestDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          request,
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
  update: async (id: number, data: Partial<RequestInterface>) => {
    try {
      const request = await RequestDB.update(data, { where: { id } });
      const { data: updatedData } = await RequestServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          request: updatedData?.request,
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
      const request = await RequestDB.destroy({ where: { id } });
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          request,
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

export { RequestServices };