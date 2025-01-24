import { SupplierDB } from "../config";
import { SupplierInterface } from "../interfaces";

const supplierServices = {
  getAll: async () => {
    try {
      const suppliers = await SupplierDB.findAll();
      if (suppliers.length === 0) {
        return {
          message: `No se encontraron proveedores`,
          status: 404,
          data: { suppliers },
        };
      }
      return {
        message: `Proveedores encontrados correctamente`,
        status: 200,
        data: { suppliers },
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
      const supplier = await SupplierDB.findOne({ where: { id } });
      if (!supplier) {
        return {
          message: `Proveedor no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Proveedor encontrado`,
        status: 200,
        data: { supplier },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<SupplierInterface>) => {
    try {
      const supplier = await SupplierDB.create({ ...data });
      return {
        message: `Proveedor creado exitosamente`,
        status: 201,
        data: { supplier },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte al administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<SupplierInterface>) => {
    try {
      await SupplierDB.update(data, { where: { id } });
      const { data: updatedData } = await supplierServices.getOne(id);
      return {
        message: `Proveedor actualizado exitosamente`,
        status: 200,
        data: { supplier: updatedData?.supplier },
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
      await SupplierDB.destroy({ where: { id } });
      return {
        message: `Proveedor eliminado exitosamente`,
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

export { supplierServices };