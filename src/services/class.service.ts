import { ClassDB } from "../config";
import { ClassInterface } from "../interfaces";

const ClassServices = {
  getAll: async () => {
    try {
      const classes = await ClassDB.findAll({ where: { status: true } });
      if (classes.length === 0) {
        return {
          message: `No se encontraron registros`,
          status: 404,
          data: {
            classes,
          },
        };
      }
      return {
        message: `Registros encontrados correctamente`,
        status: 200,
        data: {
          classes,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },

  getOne: async (id: number | string) => {
    try {
      const clase = await ClassDB.findOne({
        where: {
          cod_clase: id,
          status: true,
        },
      });
      if (!clase) {
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Registro encontrado correctamente`,
          status: 200,
          data: {
            clase,
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<ClassInterface>) => {
    data.des_clase = data.des_clase?.toLowerCase();
    try {
      const clase = await ClassDB.create({ ...data });
      return {
        message: `Clase creada exitosamente`,
        status: 201,
        data: {
          clase,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },

  update: async (id: number | string, data: Partial<ClassInterface>) => {
    data.des_clase = data.des_clase?.toLowerCase();
    try {
      await ClassDB.update(data, { where: { cod_clase: id } });
      const { data: updatedData } = await ClassServices.getOne(id);
      return {
        message: `Clase actualizada exitosamente`,
        status: 200,
        data: {
          clase: updatedData?.clase,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await ClassDB.update(
        {
          status: false,
          deletedAt: new Date(),
        },
        { where: { cod_clase: id } }
      );
      return {
        message: `Clase eliminada exitosamente`,
        status: 204,
        data: {
          clase: null,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },

  findByName: async (name: string) => {
    try {
      const clase = await ClassDB.findAll({ where: { des_clase: name } });
      if (clase.length === 0) {
        console.log("Registro no encontrado");
        return {
          message: `Clase no encontrada`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Clase encontrada correctamente`,
          status: 200,
          data: {
            clase: clase[0],
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: `Por favor, contacte con el administrador`,
        status: 500,
      };
    }
  },
};

export { ClassServices };