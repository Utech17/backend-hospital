import { SaleDB } from "../config";
import { SaleInterface } from "../interfaces";

const SaleServices = {
    getAll: async () => {
        try {
            const sales = await SaleDB.findAll({
                where: {
                    status: true,
                },
            });

            if (sales.length === 0) {
                return {
                    message: `Records not found`,
                    status: 404,
                    data: {
                        sales,
                    },
                };
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                    sales,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            };
        }
    },

    getOne: async (id: number | string) => {
        try {
            const sale = await SaleDB.findOne({
                where: {
                    id,
                    status: true,
                },
            });

            if (!sale) {
                return {
                    message: `Record not found`,
                    status: 404,
                    data: {},
                };
            }

            return {
                message: `Record found`,
                status: 200,
                data: {
                    sale,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            };
        }
    },

    create: async (data: Partial<SaleInterface>) => {
        try {
            const sale = await SaleDB.create({ ...data });
            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    sale,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            };
        }
    },

    update: async (data: Partial<SaleInterface>, id: number | string) => {
        try {
            await SaleDB.update(data, { where: { id } });
            const { data: saleData } = await SaleServices.getOne(id);

            return {
                message: `Successful update`,
                status: 200,
                data: {
                    sale: saleData?.sale,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            };
        }
    },

    delete: async (id: number | string) => {
        try {
            await SaleDB.update(
                {
                    status: false,
                },
                { where: { id } }
            );

            return {
                message: `Successful removal`,
                status: 204,
                data: null,
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            };
        }
    },
};

export { SaleServices };
