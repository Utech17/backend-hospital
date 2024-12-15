import { PatientDB } from "../config";
import { PatientInterface } from "../interfaces"; 

const PatientServices = {
  getAll: async () => {
    try {
      const patients = await PatientDB.findAll();
      if (patients.length === 0) {
        return {
          message: `No se encontraron pacientes`,
          status: 404,
          data: {
            patients,
          },
        };
      }
      return {
        message: `Pacientes encontrados correctamente`,
        status: 200,
        data: {
          patients,
        },
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
      const patient = await PatientDB.findOne({ where: { id } });
      if (!patient) {
        return {
          message: `Paciente no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Paciente encontrado`,
        status: 200,
        data: {
          patient,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<PatientInterface>) => {
    try {
      const patient = await PatientDB.create({ ...data });
      return {
        message: `Paciente creado exitosamente`,
        status: 201,
        data: {
          patient,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<PatientInterface>) => {
    try {
      await PatientDB.update(data, { where: { id } });
      const { data: updatedData } = await PatientServices.getOne(id);
      return {
        message: `Paciente actualizado exitosamente`,
        status: 200,
        data: {
          patient: updatedData?.patient,
        },
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
      await PatientDB.destroy({ where: { id } });
      return {
        message: `Paciente eliminado exitosamente`,
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

export { PatientServices };