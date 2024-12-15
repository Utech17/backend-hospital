import { JournalDB } from "../config";
import { JournalInterface } from "../interfaces";

const JournalServices = {
  getAll: async () => {
    try {
      const journals = await JournalDB.findAll();
      if (journals.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            journals,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          journals,
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
      const journal = await JournalDB.findOne({
        where: { id },
      });
      if (!journal) {
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
          journal,
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
  create: async (data: Partial<JournalInterface>) => {
    try {
      const journal = await JournalDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          journal,
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
  update: async (id: number, data: Partial<JournalInterface>) => {
    try {
      const journal = await JournalDB.update(data, { where: { id } });
      const { data: updatedData } = await JournalServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          journal: updatedData?.journal,
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
      const journal = await JournalDB.destroy({ where: { id } });
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          journal,
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

export { JournalServices };