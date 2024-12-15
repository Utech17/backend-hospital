import { ContractDB } from "../config";
import { ContractInterface } from "../interfaces";

const ContractServices = {
  getAll: async () => {
    try {
      const contracts = await ContractDB.findAll();
      if (contracts.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            contracts,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          contracts,
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
      const contract = await ContractDB.findOne({
        where: {
          id: id,
          status: true,
        },
      });
      if (!contract) {
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
            contract,
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
  create: async (data: Partial<ContractInterface>) => {
    data.id_employee = data.id_employee?.valueOf();
    try {
      const contract = await ContractDB.create({ ...data });
      return {
        message: `Creacion exitosa`,
        status: 201,
        data: {
          contract,
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
  update: async (id: number, dat: Partial<ContractInterface>) => {
    dat.id_employee = dat.id_employee?.valueOf();
    try {
      const contract = await ContractDB.update(dat, { where: { id } });
      const { data } = await ContractServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 201,
        data: {
          contract: data?.contract,
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

export { ContractServices };
