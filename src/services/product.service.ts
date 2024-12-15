import { ProductDB } from "../config";
import { ProductInterface } from "../interfaces";
const ProductServices = {
  getAll: async () => {
    try {
      const products = await ProductDB.findAll({ where: { status: true } });
      if (products.length === 0) {
        return {
          message: `Registros no encontrados`,
          status: 404,
          data: {
            products,
          },
        };
      }
      return {
        message: `Registros encontrados exitosamente`,
        status: 200,
        data: {
          products,
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
      const product = await ProductDB.findOne({
        where: {
          id: id,
          status: true,
        },
      });
      if (!product) {
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
            product,
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
  create: async (data: Partial<ProductInterface>) => {
    data.name = data.name?.toLowerCase();
    try {
      const product = await ProductDB.create({ ...data });
      return {
        message: `Creacion exitosa`,
        status: 201,
        data: {
          product,
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
  update: async (id: number, dat: Partial<ProductInterface>) => {
    dat.name = dat.name?.toLowerCase();
    try {
      const product = await ProductDB.update(dat, { where: { id } });
      const { data } = await ProductServices.getOne(id);
      return {
        message: `Actualización exitosa`,
        status: 201,
        data: {
          product: data?.product,
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
      const product = await ProductDB.update(
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
          product,
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
  findByName: async (name: string) => {
    try {
      const product = await ProductDB.findAll({ where: { name } });
      if (product.length===0) {
        console.log("Registro no encontrado")
        return {
          message: `Registro no encontrado`,
          status: 404,
          data: {},
        };
      } else {
        return {
          message: `Producto encontrado`,
          status: 200,
          data: {
            product:product[0],
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

export { ProductServices };
