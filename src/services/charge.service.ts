import { ChargeDB } from "../config";
import { ChargeInterface } from "../interfaces";

const ChargeServices = {

    getAll: async () => {
        try {
          const charges = await ChargeDB.findAll();
          if (charges.length === 0) {
            return {
              message: `Registros no encontrados`,
              status: 404,
              data: {
                charges,
              },
            };
          }
          return {
            message: `Registros encontrados exitosamente`,
            status: 200,
            data: {
              charges,
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
          const charge = await ChargeDB.findOne({
            where: {
              id: id,
              status: true,
            },
          });
          if (!charge) {
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
                charge,
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
      create: async (data: Partial<ChargeInterface>) => {
        data.charge_name = data.charge_name?.toLowerCase();
        try {
          const charge = await ChargeDB.create({ ...data });
          return {
            message: `Creacion exitosa`,
            status: 201,
            data: {
              charge,
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
      update: async (id: number, dat: Partial<ChargeInterface>) => {
        dat.charge_name = dat.charge_name?.toLowerCase();
        try {
          const charge = await ChargeDB.update(dat, { where: { id } });
          const { data } = await ChargeServices.getOne(id);
          return {
            message: `Actualización exitosa`,
            status: 201,
            data: {
              charge: data?.charge,
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
          const charge = await ChargeDB.update(
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
              charge,
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
      findBychargeName: async (name: string) => {
        try {
          const charge = await ChargeDB.findAll({ where: { name } });
          if (charge.length===0) {
            console.log("Registro no encontrado")
            return {
              message: `Registro no encontrado`,
              status: 404,
              data: {},
            };
          } else {
            return {
              message: `Service encontrado`,
              status: 200,
              data: {
                charge:charge[0],
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

export { ChargeServices };