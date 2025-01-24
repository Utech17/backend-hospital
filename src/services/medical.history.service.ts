import { MedicalHistoryDB } from "../config"; 
import { MedicalHistoryInterface } from "../interfaces"; 

const medicalHistoryServices = {
  getAll: async () => {
    try {
      const medicalHistory = await MedicalHistoryDB.findAll();
      if (medicalHistory.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            medicalHistory,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          medicalHistory,
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
      const history = await MedicalHistoryDB.findOne({
        where: { id },
      });
      if (!history) {
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
          history,
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
  create: async (data: Partial<MedicalHistoryInterface>) => {
    try {
      const history = await MedicalHistoryDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          history,
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
  update: async (id: number, data: Partial<MedicalHistoryInterface>) => {
    try {
      await MedicalHistoryDB.update(data, { where: { id } });
      const { data: updatedData } = await medicalHistoryServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          history: updatedData?.history,
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
      const history = await MedicalHistoryDB.update(
        { discharge_date: new Date() },
        { where: { id } }
      );
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          history,
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

export { medicalHistoryServices };