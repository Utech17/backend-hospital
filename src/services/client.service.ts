import { ClientDB } from "../config";
import { ClientInterface } from "../interfaces";

const clientServices = {

    getAll: async () => {
        try {
          const clients = await ClientDB.findAll();
          if (clients.length === 0) {
            return {
              message: `Registros no encontrados`,
              status: 404,
              data: {
                clients,
              },
            };
          }
          return {
            message: `Registros encontrados exitosamente`,
            status: 200,
            data: {
              clients,
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
      getOne: async (id: number | string ) => {
        try {
          const client = await ClientDB.findOne({
            where: {
              id: id,
              status: true,
            },
          });
          if (!client) {
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
                client,
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
      create: async (data: Partial<ClientInterface>) => {
        data.name = data.name?.toLowerCase();
        try {
          const client = await ClientDB.create({ ...data });
          return {
            message: `Creacion exitosa`,
            status: 201,
            data: {
              client,
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
      update: async (id: number, dat: Partial<ClientInterface>) => {
        dat.name = dat.name?.toLowerCase();
        try {
          const client = await ClientDB.update(dat, { where: { id } });
          const { data } = await clientServices.getOne(id);
          return {
            message: `Actualización exitosa`,
            status: 201,
            data: {
              client: data?.client,
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
          const client = await ClientDB.update(
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
              client,
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
          const client: ClientInterface | any = await ClientDB.findAll({
            where: { email },
          });
          if (!client) {
            return {
              message: `Registro no encontrado`,
              status: 404,
              data: {
                client,
              },
            };
          } else {
            return {
              message: `Registro encontrado`,
              status: 200,
              data: {
                client,
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

      getByPhone_number: async (phone_number: string) => {
        try {
          const client: ClientInterface | any = await ClientDB.findAll({
            where: { phone_number },
          });
          if (!client) {
            return {
              message: `Registro no encontrado`,
              status: 404,
              data: {
                client,
              },
            };
          } else {
            return {
              message: `Registro encontrado`,
              status: 200,
              data: {
                client,
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

export { clientServices };