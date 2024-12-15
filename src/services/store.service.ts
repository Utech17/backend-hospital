import { exportExcelAtoA } from "../helpers";
import { StoreDB } from "../config";
import { StoreInterface } from "../interfaces";

const StoreServices = {
  getAll: async () => {
    try {
      const stores = await StoreDB.findAll({ where: { status: true } });
      if (stores.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            stores,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          stores,
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
  getOne: async (id: number|string) => {
    try {
      const store = await StoreDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!store) {
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
            store,
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
  create: async (data: Partial<StoreInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const store = await StoreDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          store,
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
  update: async (id: number|string, dat: Partial<StoreInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let store: StoreInterface | any = await StoreDB.update(dat, { where: { id } });
      const { data } = await StoreServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          store: data?.store,
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
      const store = await StoreDB.update(
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
          store:null,
        },
      };
    } catch (error) {
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  findByName: async (name: string) => {
    try {
      const store = await StoreDB.findAll({ where: { name } });
      if (store.length===0) {
        console.log("Registro no encontrado")
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Store encontrado`,
          status: 200,
          data: {
            store:store[0],
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
  reportToExcelStores: async () => {
    try {
      const stores: any = await StoreDB.findAll();
      let report = stores.map((store: any) => store.dataValues); // Accede a dataValues de cada rol
      let mappedReport = report.map((res: any) => {
        return [res.id, res.name]; // Mapea a un arreglo de arreglos
      });
      const { status, message, data } = await exportExcelAtoA(
        ["id", "name"],
        mappedReport,
        "datosTest"
      );//usamos el helper para pasarle los parametros 
      return {
        message,
        status,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  }
};

export {StoreServices}