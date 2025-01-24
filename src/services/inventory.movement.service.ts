import { InventoryMovementDB } from "../config";
import { InventoryMovementInterface } from "../interfaces"; 

const inventoryMovementServices = {
  getAll: async () => {
    try {
      const inventoryMovements = await InventoryMovementDB.findAll();
      if (inventoryMovements.length === 0) {
        return {
          message: `No se encontraron movimientos de inventario`,
          status: 404,
          data: {
            inventoryMovements,
          },
        };
      }
      return {
        message: `Movimientos de inventario encontrados correctamente`,
        status: 200,
        data: {
          inventoryMovements,
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
      const movement = await InventoryMovementDB.findOne({ where: { id } });
      if (!movement) {
        return {
          message: `Movimiento de inventario no encontrado`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Movimiento de inventario encontrado`,
        status: 200,
        data: {
          movement,
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

  create: async (data: Partial<InventoryMovementInterface>) => {
    try {
      const movement = await InventoryMovementDB.create({ ...data });
      return {
        message: `Movimiento de inventario creado exitosamente`,
        status: 201,
        data: {
          movement,
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

  update: async (id: number, data: Partial<InventoryMovementInterface>) => {
    try {
      await InventoryMovementDB.update(data, { where: { id } });
      const { data: updatedData } = await inventoryMovementServices.getOne(id);
      return {
        message: `Movimiento de inventario actualizado exitosamente`,
        status: 200,
        data: {
          movement: updatedData?.movement,
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
      await InventoryMovementDB.destroy({ where: { id } });
      return {
        message: `Movimiento de inventario eliminado exitosamente`,
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

export { inventoryMovementServices };