import { PayrollDetailDB } from "../config";
import { PayrollDetailInterface } from "../interfaces";

const payrollDetailServices = {
  // Obtener todos los detalles de nómina
  getAll: async () => {
    try {
      const payrollDetails = await PayrollDetailDB.findAll();
      if (payrollDetails.length === 0) {
        return {
          message: `No se encontraron detalles de nómina`,
          status: 404,
          data: {
            payrollDetails,
          },
        };
      }
      return {
        message: `Detalles de nómina encontrados correctamente`,
        status: 200,
        data: {
          payrollDetails,
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

  // Obtener un detalle de nómina por ID
  getOne: async (id: number) => {
    try {
      const detail = await PayrollDetailDB.findOne({ where: { id } });
      if (!detail) {
        return {
          message: `Detalle de nómina no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Detalle de nómina encontrado correctamente`,
        status: 200,
        data: {
          detail,
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

  // Crear un nuevo detalle de nómina
  create: async (data: Partial<PayrollDetailInterface>) => {
    try {
      const detail = await PayrollDetailDB.create({ ...data });
      return {
        message: `Detalle de nómina creado exitosamente`,
        status: 201,
        data: {
          detail,
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

  // Actualizar un detalle de nómina por ID
  update: async (id: number, data: Partial<PayrollDetailInterface>) => {
    try {
      await PayrollDetailDB.update(data, { where: { id } });
      const { data: updatedData } = await payrollDetailServices.getOne(id);
      return {
        message: `Detalle de nómina actualizado exitosamente`,
        status: 200,
        data: {
          detail: updatedData?.detail,
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

  // Eliminar un detalle de nómina por ID
  delete: async (id: number) => {
    try {
      await PayrollDetailDB.destroy({ where: { id } });
      return {
        message: `Detalle de nómina eliminado exitosamente`,
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

export { payrollDetailServices };