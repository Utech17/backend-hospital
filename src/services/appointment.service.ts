import { AppointmentDB, EmployeeDB, PatientDB, UserDB } from "../config";
import { AppointmentInterface } from "../interfaces";

const AppointmentServices = {
  getAll: async () => {
    try {
      const Appointments = await AppointmentDB.findAll({
        include: [{
          model: PatientDB,
        },{
          model: EmployeeDB,
          include: [{ model: UserDB }],
        }],
      });
      if (Appointments.length === 0) {
        return {
          message: `No se encontraron citas`,
          status: 404,
          data: {
            Appointments,
          },
        };
      }
      return {
        message: `Citas encontradas exitosamente`,
        status: 200,
        data: {
          Appointments,
        },
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const appointment = await AppointmentDB.findOne({ where: { id } });
      if (!appointment) {
        return {
          message: `Cita no encontrada`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Cita encontrada exitosamente`,
        status: 200,
        data: {
          appointment,
        },
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<AppointmentInterface>) => {
    try {
      const appointment = await AppointmentDB.create({ ...data });
      return {
        message: `Cita creada exitosamente`,
        status: 201,
        data: {
          appointment,
        },
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<AppointmentInterface>) => {
    try {
      await AppointmentDB.update(data, { where: { id } });
      const { data: updatedData } = await AppointmentServices.getOne(id);
      return {
        message: `Cita actualizada exitosamente`,
        status: 200,
        data: {
          appointment: updatedData?.appointment,
        },
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await AppointmentDB.destroy({ where: { id } });
      return {
        message: `Cita eliminada exitosamente`,
        status: 204,
        data: {},
      };
    } catch (error: any) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
      };
    }
  },
};

export { AppointmentServices };