import { TypeDB } from "../config"; 
import { TypeInterface } from "../interfaces"; 

const typeServices = {
  getAll: async () => {
    try {
      const types = await TypeDB.findAll();
      if (types.length === 0) {
        return {
          message: `No se encontraron registros`,
          status: 404,
          data: {
            types,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          types,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
  getOne: async (id: number) => {
    try {
      const type = await TypeDB.findOne({
        where: { cod_type: id },
      });
      if (!type) {
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
          type,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
  create: async (data: Partial<TypeInterface>) => {
    try {
      const type = await TypeDB.create({ ...data });
      return {
        message: `Creado exitosamente`,
        status: 201,
        data: {
          type,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
  update: async (id: number, data: Partial<TypeInterface>) => {
    try {
      await TypeDB.update(data, { where: { cod_type: id } });
      const { data: updatedData } = await typeServices.getOne(id);
      return {
        message: `Actualizado exitosamente`,
        status: 200,
        data: {
          type: updatedData?.type,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
  delete: async (id: number) => {
    try {
      await TypeDB.destroy({ where: { cod_type: id } });
      return {
        message: `Eliminado exitosamente`,
        status: 204,
        data: null, // Incluye la propiedad data
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
        data: null, // Consistencia en caso de error
      };
    }
  },
};

export { typeServices };