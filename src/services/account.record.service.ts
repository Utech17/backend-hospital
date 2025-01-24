import { AccountRecordDB } from "../config";
import { AccountRecordInterface } from "../interfaces";

const AccountRecordServices = {
  getAll: async () => {
    try {
      const accountRecords = await AccountRecordDB.findAll();
      if (accountRecords.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            accountRecords,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          accountRecords,
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
      const accountRecord = await AccountRecordDB.findOne({
        where: { id },
      });
      if (!accountRecord) {
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
          accountRecord,
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
  create: async (data: Partial<AccountRecordInterface>) => {
    try {
      const accountRecord = await AccountRecordDB.create(data);
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          accountRecord,
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
  update: async (id: number, data: Partial<AccountRecordInterface>) => {
    try {
      const accountRecord = await AccountRecordDB.update(data, { where: { id } });
      const { data: updatedData } = await AccountRecordServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          accountRecord: updatedData?.accountRecord,
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
      const accountRecord = await AccountRecordDB.destroy({ where: { id } });
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          accountRecord,
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

export { AccountRecordServices };