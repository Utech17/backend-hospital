import { WorkingDayDB } from "../config"; 
import { WorkingDayInterface } from "../interfaces";

const WorkingDayServices = {
  getAll: async () => {
    try {
      const workingDays = await WorkingDayDB.findAll();
      if (workingDays.length === 0) {
        return {
          message: `No se encontraron registros`,
          status: 404,
          data: {
            workingDays,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          workingDays,
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

  getOne: async (id: number | string) => {
    try {
      const workingDay = await WorkingDayDB.findOne({
        where: { id },
      });
      if (!workingDay) {
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
          workingDay,
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

  create: async (data: Partial<WorkingDayInterface>) => {
    try {
      const workingDay = await WorkingDayDB.create({ ...data });
      return {
        message: `Creado exitosamente`,
        status: 201,
        data: {
          workingDay,
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

  update: async (id: number, data: Partial<WorkingDayInterface>) => {
    try {
        await WorkingDayDB.update(data, { where: { id } });
        const { data: updatedData } = await WorkingDayServices.getOne(id);
        return {
            message: `Actualizado exitosamente`,
            status: 200,
            data: {
                workingDay: updatedData?.workingDay,
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

  delete: async (id: number | string) => {
    try {
      const deletedRows = await WorkingDayDB.destroy({ where: { id } });
      if (deletedRows === 0) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: null,
        };
      }
      return {
        message: `Eliminado exitosamente`,
        status: 204,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor contacte al administrador`,
        status: 500,
        data: null,
      };
    }
  },
};

export { WorkingDayServices };