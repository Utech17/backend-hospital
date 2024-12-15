import { PresentationDB } from "../config";
import { PresentationInterface } from "../interfaces";

const PresentationServices = {
  getAll: async () => {
    try {
      const presentations = await PresentationDB.findAll();
      if (presentations.length === 0) {
        return {
          message: `No presentations found`,
          status: 404,
          data: {
            presentations,
          },
        };
      }
      return {
        message: `Presentations retrieved successfully`,
        status: 200,
        data: {
          presentations,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  getOne: async (id: number) => {
    try {
      const presentation = await PresentationDB.findOne({ where: { cod_pres: id } });
      if (!presentation) {
        return {
          message: `Presentation not found`,
          status: 404,
          data: {},
        };
      }
      return {
        message: `Presentation retrieved successfully`,
        status: 200,
        data: {
          presentation,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  create: async (data: Partial<PresentationInterface>) => {
    try {
      const presentation = await PresentationDB.create({ ...data });
      return {
        message: `Presentation created successfully`,
        status: 201,
        data: {
          presentation,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  update: async (id: number, data: Partial<PresentationInterface>) => {
    try {
      await PresentationDB.update(data, { where: { cod_pres: id } });
      const { data: updatedData } = await PresentationServices.getOne(id);
      return {
        message: `Presentation updated successfully`,
        status: 200,
        data: {
          presentation: updatedData?.presentation,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await PresentationDB.destroy({ where: { cod_pres: id } });
      return {
        message: `Presentation deleted successfully`,
        status: 204,
        data: {},
      };
    } catch (error) {
      console.error(error);
      return {
        message: `Please contact the administrator`,
        status: 500,
      };
    }
  },
};

export { PresentationServices };