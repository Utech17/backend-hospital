import { OrganizationalUnitsDB } from "../config";
import { OrganizationalUnitsInterface } from "../interfaces";

const OrganizationalUnitsService = {
    getAll: async () => {
        try {
            const organizational_unitss = await OrganizationalUnitsDB.findAll({
                where: {
                    status: true,
                },
            });

            if (organizational_unitss.length === 0) {
                return {
                    message: `No records found`,
                    status: 404,
                    data: {
                        organizational_unitss,
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
            console.error('Error fetching organizational_units:', error);
            return {
                message: 'Error fetching organizational_units',
                status: 500,
            };
        }
    },

getOne: async (id: number | string) => {
    try {
      const organizational_units = await OrganizationalUnitsDB.findOne({
        where: {
          id,
          status: true,
        },
      })

      if (!organizational_units) {
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
            organizational_units,
          },
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching organizational_unitss",
        status: 500,
      }
    }
  },

  create: async (data: Partial<OrganizationalUnitsInterface>) => {
    try {
      const organizational_units = await OrganizationalUnitsDB.create({ ...data });
      return {
        message: "Successful creation",
        status: 201,
        data: {
          organizational_units,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching organizational_units",
        status: 500,
      }
    }
  },

  update: async (data: Partial<OrganizationalUnitsInterface>, id: number | string) => {
    try {
      await OrganizationalUnitsDB.update(data, { where: { id } });
      const { data: updatedorganizational_units } = await OrganizationalUnitsService.getOne(id);

      return {
        message: "Successful update",
        status: 200,
        data: {
          organizational_units: updatedorganizational_units,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching organizational_units",
        status: 500,
      }
    }
  },

  delete: async (id: number | string) => {
    try {
      await OrganizationalUnitsDB.update(
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
        message: "Error fetching organizational_units",
        status: 500,
      }
    }
  },

  findByName: async (units_name: string) => {
    try {
      const organizational_units = await OrganizationalUnitsDB.findOne({ where: { units_name } });
      if (!organizational_units) {
        return {
          message: "Record not found",
          status: 404,
          data: {},
        };
      } else {
        return {
          message: "Record found",
          status: 200,
          data: {
            organizational_units,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching organizational_units",
        status: 500,
      };
    }
  },
}

export { OrganizationalUnitsService }


