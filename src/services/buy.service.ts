import { BuyDB } from "../config";
import { BuyInterface } from "../interfaces";

const BuyServices = {
    getAll: async () => {
        try {
            const buys = await BuyDB.findAll({
                where: {
                    status: true,
                },
            });

            if (buys.length === 0) {
                return {
                    message: `Records not found`,
                    status: 404,
                    data: {
                        buys,
                    },
                };
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                    buys,
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
            const buys = await BuyDB.findOne({
                where: {
                    id,
                    status: true,
                },
            });

            if (!buys) {
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
                    buys,
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

    create: async (data: Partial<BuyInterface>) => {
        try {
            const buys = await BuyDB.create({ ...data });
            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    buys,
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

    update: async (data: Partial<BuyInterface>, id: number | string) => {
        try {
            await BuyDB.update(data, { where: { id } });
            const { data: buysData } = await BuyServices.getOne(id);

            return {
                message: `Successful update`,
                status: 200,
                data: {
                    buys: buysData?.buys,
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
            await BuyDB.update(
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

export {BuyServices,};