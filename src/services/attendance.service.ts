import { AttendanceDB } from "../config";
import { AttendanceInterface } from "../interfaces"; 

const attendanceServices = {
  getAll: async () => {
    try {
      const attendances = await AttendanceDB.findAll();
      if (attendances.length === 0) {
        return {
          message: `No se encontraron registros de asistencia`,
          status: 404,
          data: {
            attendances,
          },
        };
      }
      return {
        message: `Registros de asistencia encontrados correctamente`,
        status: 200,
        data: {
          attendances,
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
      const attendance = await AttendanceDB.findOne({ where: { id } });
      if (!attendance) {
        return {
          message: `Registro de asistencia no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Registro de asistencia encontrado correctamente`,
        status: 200,
        data: {
          attendance,
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

  create: async (data: Partial<AttendanceInterface>) => {
    try {
      const attendance = await AttendanceDB.create({ ...data });
      return {
        message: `Registro de asistencia creado exitosamente`,
        status: 201,
        data: {
          attendance,
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

  update: async (id: number, data: Partial<AttendanceInterface>) => {
    try {
      await AttendanceDB.update(data, { where: { id } });
      const { data: updatedData } = await attendanceServices.getOne(id);
      return {
        message: `Registro de asistencia actualizado exitosamente`,
        status: 200,
        data: {
          attendance: updatedData?.attendance,
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
      await AttendanceDB.destroy({ where: { id } });
      return {
        message: `Registro de asistencia eliminado exitosamente`,
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

export { attendanceServices };