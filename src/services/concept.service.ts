import { ConceptDB } from "../config";
import { ConceptInterface } from "../interfaces";
const conceptServices = {
  getAll: async () => {
    try {
      const concepts = await ConceptDB.findAll();
      if (concepts.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            concepts,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          concepts,
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
      const concept = await ConceptDB.findOne({
        where: {
          id: id,
          status: true,
        },
      });
      if (!concept) {
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
            concept,
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
  create: async (data: Partial<ConceptInterface>) => {
    data.name = data.name?.valueOf();
    try {
      const concept = await ConceptDB.create({ ...data });
      return {
        message: `Creacion exitosa`,
        status: 201,
        data: {
          concept,
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
  update: async (id: number, dat: Partial<ConceptInterface>) => {
    dat.name = dat.name?.valueOf();
    try {
      const concept = await ConceptDB.update(dat, { where: { id } });
      const { data } = await conceptServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 201,
        data: {
          concept: data?.concept,
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
};

export { conceptServices };
