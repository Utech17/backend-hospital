import { InventoryDB } from "../config";
import { InventoryInterface } from "../interfaces";

const InventoryService = {
  getAllInventorys: async () => {
    try {
      const inventories = await InventoryDB.findAll({ where: { status: true } });
      if (inventories.length === 0) {
        return {
          message: "No se encontraron registros",
          status: 404,
          data: { inventories },
        };
      }
      return {
        message: "Registros encontrados correctamente",
        status: 200,
        data: { inventories },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },

  getOne: async (id: number | string) => {
    try {
      const inventory = await InventoryDB.findOne({
        where: { id, status: true },
      });
      if (!inventory) {
        return {
          message: "Registro no encontrado",
          status: 404,
          data: {},
        };
      }
      return {
        message: "Registro encontrado correctamente",
        status: 200,
        data: { inventory },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },

  create: async (data: Partial<InventoryInterface>) => {
    try {
      const inventory = await InventoryDB.create({ ...data });
      return {
        message: "Inventario creado exitosamente",
        status: 201,
        data: { inventory },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },

  update: async (id: number | string, data: Partial<InventoryInterface>) => {
    try {
      await InventoryDB.update(data, { where: { id } });
      const { data: updatedData } = await InventoryService.getOne(id);
      return {
        message: "Inventario actualizado exitosamente",
        status: 200,
        data: { inventory: updatedData?.inventory },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },

  delete: async (id: number | string) => {
    try {
      await InventoryDB.update(
        { status: false, deletedAt: new Date() },
        { where: { id } }
      );
      return {
        message: "Inventario eliminado exitosamente",
        status: 204,
        data: {},
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },

  findByName: async (name: string) => {
    try {
      const inventory = await InventoryDB.findAll({ where: { name } });
      if (inventory.length === 0) {
        return {
          message: "Inventario no encontrado",
          status: 404,
          data: {},
        };
      }
      return {
        message: "Inventario encontrado correctamente",
        status: 200,
        data: { inventory: inventory[0] },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte con el administrador",
        status: 500,
      };
    }
  },
};

export { InventoryService };