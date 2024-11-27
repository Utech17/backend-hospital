import { UserDB } from "../config";
import { UserInterface } from "../interfaces";
const userServices = {
  getAll: async () => {
    try {
      const users = await UserDB.findAll();
      if (users.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            users,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          users,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  getOne: async (id: number) => {
    try {
      const user = await UserDB.findOne({
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
    data.name = data.name?.toLowerCase();
    try {
      const user = await UserDB.create({ ...data });
      return {
        message: `Creacion exitosa`,
        status: 201,
        data: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  update: async (id: number, dat: Partial<UserInterface>) => {
    dat.name = dat.name?.toLowerCase();
    try {
      const user = await UserDB.update(dat, { where: { id } });
      const { data } = await userServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 201,
        data: {
          user: data?.user,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  delete: async (id: number) => {
    try {
      const user = await UserDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { id } }
      );
      return {
        message: `Eliminación exitosa`,
        status: 204,
        data: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
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
};

export { userServices };
