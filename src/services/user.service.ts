import { UserDB } from "../config";
import { UserInterface } from "../interfaces";
import { createToken } from "../helpers";

const UserServices = {
  getAll: async () => {
    try {
      const users = await UserDB.findAll();
      if (users.length === 0) {
        return {
          message: `No se encontraron usuarios`,
          status: 404,
          data: {
            users,
          },
        };
      }
      return {
        message: `Usuarios obtenidos correctamente`,
        status: 200,
        data: {
          users,
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
      const user:any = await UserDB.findOne({
        where: {
          id: id,
          status: true,
        },
      });
      if (!user) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: {
            user,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<UserInterface>) => {
    try {
      const user = await UserDB.create({ ...data });
      return {
        message: `Usuario creado exitosamente`,
        status: 201,
        data: {
          user,
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

  update: async (id: number, data: Partial<UserInterface>) => {
    try {
      await UserDB.update(data, { where: { id } });
      const { data: updatedData } = await UserServices.getOne(id);
      return {
        message: `Usuario actualizado exitosamente`,
        status: 200,
        data: {
          user: updatedData?.user,
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
      await UserDB.destroy({ where: { id } });
      return {
        message: `Usuario eliminado exitosamente`,
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

  getByEmail: async (email: string) => {
    try {
      const user: UserInterface | any = await UserDB.findAll({
        where: { email },
      });
      if (!user) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {
            user,
          },
        };
      } else {
        return {
          message: `Registro encontrado`,
          status: 200,
          data: {
            user,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contact the administrator: error`,
        status: 500,
      };
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      if (!email || !password) {
        return {
          message: `Email y contraseña son requeridos`,
          status: 400,
        };
      }

      const { data, status } = await UserServices.getByEmail(email);

      if (status === 200) {
        const user = data?.user?.[0];
        if (user && password === user.password) {
          // Creamos el token
          const token = await createToken(user);
          // Enviamos la respuesta
          return {
            message: `Login exitoso`,
            status: 200,
            data: {
              user,
              token,
            },
          };
        } else {
          return {
            message: `Credenciales incorrectas`,
            status: 401,
            data: {},
          };
        }
      } else {
        return {
          message: `Credenciales incorrectas`,
          status: 401,
          data: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },

  updateStatus: async (id: number, status: boolean) => {
    try {
      const user = await UserDB.findByPk(id);

      if (!user) {
        return {
          message: `Usuario con ID ${id} no encontrado`,
          status: 404,
          data: {},
        };
      }

      // Actualizar el estado
      await user.update({ status });

      return {
        message: `Estado del usuario actualizado correctamente`,
        status: 200,
        data: {
          user,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Por favor, contacte al administrador",
        status: 500,
      };
    }
  },
};

export { UserServices };