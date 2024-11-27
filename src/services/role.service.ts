
import { exportExcelAtoA } from "../helpers";
import { RoleDB } from "../config";
import { RoleInterface } from "../interfaces";

const roleServices = {
  getAll: async () => {
    try {
      const roles = await RoleDB.findAll({ where: { status: true } });
      if (roles.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            roles,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          roles,
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
      const role = await RoleDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!role) {
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
            role,
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
  create: async (data: Partial<RoleInterface>) => {
    data.name=data.name?.toLowerCase();
    try {
      const role = await RoleDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          role,
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
  update: async (id: number|string, dat: Partial<RoleInterface>) => {
    dat.name=dat.name?.toLowerCase();
    try {
      let role: RoleInterface | any = await RoleDB.update(dat, { where: { id } });
      const { data } = await roleServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          role: data?.role,
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
      const role = await RoleDB.update(
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
          role:null,
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
      const role = await RoleDB.findAll({ where: { name } });
      if (role.length===0) {
        console.log("Registro no encontrado")
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Role encontrado`,
          status: 200,
          data: {
            role:role[0],
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
  reportToExcelRoles: async () => {
    try {
      const roles: any = await RoleDB.findAll();
      let report = roles.map((role: any) => role.dataValues); // Accede a dataValues de cada rol
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

export {
  roleServices
}


