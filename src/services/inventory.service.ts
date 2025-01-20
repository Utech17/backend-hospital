import { InventoryDB } from "../config";
import { InventoryInterface } from "../interfaces";

const InventoryService = {
    getAllInventorys: async () => {
        try {
            const Inventorys = await InventoryDB.findAll({
                where: {
                    status: true,
                },
            });

            if (Inventorys.length === 0) {
                return {
                    message: `No records found`,
                    status: 404,
                    data: {
                        Inventorys,
                    },
                };
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                },
            };

        } catch (error) {
            console.error('Error fetching Inventory:', error);
            return {
                message: 'Error fetching Inventory',
                status: 500,
            };
        }
    },

getOne: async (id: number | string) => {
    try {
      const Inventory = await InventoryDB.findOne({
        where: {
          id,
          status: true,
        },
      })

      if (!Inventory) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        }
      } else {
        return {
          message: "Record found",
          status: 200,
          data: {
            Inventory,
          },
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching Inventorys",
        status: 500,
      }
    }
  },

  create: async (data: Partial<InventoryInterface>) => {
    try {
      const Inventory = await InventoryDB.create({ ...data });
      return {
        message: "Successful creation",
        status: 201,
        data: {
          Inventory,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching Inventory",
        status: 500,
      }
    }
  },

  update: async (data: Partial<InventoryInterface>, id: number | string) => {
    try {
      await InventoryDB.update(data, { where: { id } });
      const { data: updatedInventory } = await InventoryService.getOne(id);

      return {
        message: "Successful update",
        status: 200,
        data: {
          Inventory: updatedInventory,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching Inventory",
        status: 500,
      }
    }
  },

  delete: async (id: number | string) => {
    try {
      await InventoryDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { id } }
      )
      return {
        message: "Successful removal",
        status: 204,
        data: {},
      }
    } catch (error) {
      return {
        message: "Error fetching Inventory",
        status: 500,
      }
    }
  },

 
}

export { InventoryService }