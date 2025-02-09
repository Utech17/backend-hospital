import { DepartmentDB } from "../config";
import { DepartmentInterface } from "../interfaces";

const DepartmentServices = {
  getAll: async () => {
    try {
      const departaments = await DepartmentDB.findAll();
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
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        message: `Contacte con el administrador: ${errorMessage}`,
        status: 500,
      };
    }
  },
  getOne: async (id: number|string) => {
    try {
      const departament = await DepartmentDB.findOne({
        where: {
          id: id
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
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        message: `Contacte con el administrador: ${errorMessage}`,
        status: 500,
      };
    }
  },
  create: async (data: Partial<DepartmentInterface>) => {
    data.department_name = data.department_name?.toLowerCase();
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
        console.error(error);
        let errorMessage = 'Error desconocido';
        if (error instanceof Error) {
            errorMessage = error.message;
            if (error.name === 'SequelizeUniqueConstraintError') {
                errorMessage = 'El nombre del departamento ya existe';
            }
        }
        return {
            message: `Contacte con el administrador: ${errorMessage}`,
            status: 500,
        };
    }
},
update: async (id: number|string, data: Partial<DepartmentInterface>) => {
  if (data.department_name) {
      data.department_name = data.department_name.toLowerCase();
  }
  try {
      await DepartmentDB.update(data, { where: { id } });
      const { data: updatedData } = await DepartmentServices.getOne(id);
      return {
          message: `Actualización exitosa`,
          status: 200,
          data: {
              departament: updatedData?.departament,
          },
      };
  } catch (error) {
      console.error(error);
      let errorMessage = 'Error desconocido';
      if (error instanceof Error) {
          errorMessage = error.message;
          if (error.name === 'SequelizeUniqueConstraintError') {
              errorMessage = 'El nombre del departamento ya existe';
          }
      }
      return {
          message: `Contacte con el administrador: ${errorMessage}`,
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
          departament: null,
        },
      };
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        message: `Contacte con el administrador: ${errorMessage}`,
        status: 500,
      };
    }
  },
  findBydepartment_name: async (department_name: string) => {
    try {
      const departament = await DepartmentDB.findAll({ where: { department_name } });
      if (departament.length === 0) {
        console.log("Registro no encontrado");
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
            departament: departament[0],
          },
        };
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return {
        message: `Contacte con el administrador: ${errorMessage}`,
        status: 500,
      };
    }
  },
};

export {
  DepartmentServices
};