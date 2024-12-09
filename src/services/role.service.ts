import { RoleDB } from "../config";
import { RoleInterface } from "../interfaces";

const RoleService = {
    getAllRoles: async () => {
        try {
            const Roles = await RoleDB.findAll({
                where: {
                    status: true,
                },
            });

            if (Roles.length === 0) {
                return {
                    message: `No records found`,
                    status: 404,
                    data: {
                        Roles,
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
            console.error('Error fetching role:', error);
            return {
                message: 'Error fetching role',
                status: 500,
            };
        }
    },

getOne: async (id: number | string) => {
    try {
      const Role = await RoleDB.findOne({
        where: {
          id,
          status: true,
        },
      })

      if (!Role) {
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
            Role,
          },
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching roles",
        status: 500,
      }
    }
  },

  create: async (data: Partial<RoleInterface>) => {
    try {
      const Role = await RoleDB.create({ ...data });
      return {
        message: "Successful creation",
        status: 201,
        data: {
          Role,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching role",
        status: 500,
      }
    }
  },

  update: async (data: Partial<RoleInterface>, id: number | string) => {
    try {
      await RoleDB.update(data, { where: { id } });
      const { data: updatedRole } = await RoleService.getOne(id);

      return {
        message: "Successful update",
        status: 200,
        data: {
          Role: updatedRole,
        },
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching role",
        status: 500,
      }
    }
  },

  delete: async (id: number | string) => {
    try {
      await RoleDB.update(
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
        message: "Error fetching role",
        status: 500,
      }
    }
  },

  findByName: async (role_name: string) => {
    try {
      const Role = await RoleDB.findOne({ where: { role_name } });
      if (!Role) {
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
            Role,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Error fetching role",
        status: 500,
      };
    }
  },
}

export { RoleService }