import { AppointmentDB } from "../config";
import { AppointmentInterface } from "../interfaces";

const AppointmentServices = {
  getAll: async () => {
    try {
      const Appointments = await AppointmentDB.findAll();
      if (Appointments.length === 0) {
        return {
          message: `No Appointments found`,
          status: 404,
          data: {
            Appointments,
          },
        };
      }
      return {
        message: `Appointments found successfully`,
        status: 200,
        data: {
          Appointments,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const appointment = await AppointmentDB.findOne({ where: { id } });
      if (!appointment) {
        return {
          message: `Appointment not found`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Appointment found successfully`,
        status: 200,
        data: {
          appointment,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<AppointmentInterface>) => {
    try {
      const appointment = await AppointmentDB.create({ ...data });
      return {
        message: `Appointment created successfully`,
        status: 201,
        data: {
          appointment,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<AppointmentInterface>) => {
    try {
      await AppointmentDB.update(data, { where: { id } });
      const { data: updatedData } = await AppointmentServices.getOne(id);
      return {
        message: `Appointment updated successfully`,
        status: 200,
        data: {
          appointment: updatedData?.appointment,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await AppointmentDB.destroy({ where: { id } });
      return {
        message: `Appointment deleted successfully`,
        status: 204,
        data: {},
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },
};

export { AppointmentServices };