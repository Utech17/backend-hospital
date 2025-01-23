import { DepartmentDB } from "../config";
import { DepartmentInterface } from "../interfaces";

const DepartmentServices = {
  getAll: async () => {
    try {
      const departaments = await DepartmentDB.findAll({ where: { status: true } });
      if (departaments.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            departaments,
          },
        };
      }
      return {
        message: `Registros encontrados`,
        status: 200,
        data: {
          departaments,
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
      const departament = await DepartmentDB.findOne({
        where: {
          id: id,
          status: true
        }
      });
      if (!departament) {
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
            departament,
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
  create: async (data: Partial<DepartmentInterface>) => {
    data.department_name=data.department_name?.toLowerCase();
    try {
      const departament = await DepartmentDB.create({ ...data });
      return {
        message: `Creación exitosa`,
        status: 201,
        data: {
          departament,
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
  update: async (id: number|string, dat: Partial<DepartmentInterface>) => {
    dat.department_name=dat.department_name?.toLowerCase();
    try {
      let departament: DepartmentInterface | any = await DepartmentDB.update(dat, { where: { id } });
      const { data } = await DepartmentServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 200,
        data: {
          departament: data?.departament,
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
      const departament = await DepartmentDB.update(
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
          departament:null,
        },
      };
    } catch (error) {
      return {
        message: `Contacte con el administrador`,
        status: 500,
      };
    }
  },
  findBydepartment_name: async (department_name: string) => {
    try {
      const departament = await DepartmentDB.findAll({ where: { department_name } });
      if (departament.length===0) {
        console.log("Registro no encontrado")
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `departament encontrado`,
          status: 200,
          data: {
            departament:departament[0],
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

export {
  DepartmentServices
}


