import { BuyDB, PurchaseDetailsDB, SupplierDB } from "../config";
import { BuyInterface, PurchaseDetailsInterface } from "../interfaces";

const BuyServices = {
    getAll: async () => {
        try {
            const buys = await BuyDB.findAll({
                where: {
                    status: true,
                },
                include: [
                    {
                        model: PurchaseDetailsDB,
                        as: "purchaseDetails",
                    },
                    {
                        model: SupplierDB,
                        as: "supplier",
                    },
                ],
            });

            if (buys.length === 0) {
                return {
                    message: `No se encontraron registros`,
                    status: 404,
                    data: {
                        buys,
                    },
                };
            }

            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    buys,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor, contacte al administrador: error`,
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
                include: [
                    {
                        model: PurchaseDetailsDB,
                        as: "purchaseDetails",
                    },
                    {
                        model: SupplierDB,
                        as: "supplier",
                    },
                ],
            });

            if (!buys) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {},
                };
            }

            return {
                message: `Registro encontrado`,
                status: 200,
                data: {
                    buys,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                message: `Por favor, contacte al administrador: error`,
                status: 500,
            };
        }
    },

    create: async (data: Partial<BuyInterface>, purchaseDetails: PurchaseDetailsInterface[]) => {
        try {
            const buy = await BuyDB.create({ ...data });
            for (const detail of purchaseDetails) {
                await PurchaseDetailsDB.create({
                    ...detail,
                    purchaseId: buy.dataValues.id,
                });
            }

            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    buy,
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

    update: async (data: Partial<BuyInterface>, id: number | string, purchaseDetails: PurchaseDetailsInterface[]) => {
        try {
            await BuyDB.update(data, { where: { id } });
            for (const detail of purchaseDetails) {
                await PurchaseDetailsDB.upsert({
                    ...detail,
                    purchaseId: id,
                });
            }

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
            await PurchaseDetailsDB.update(
                { status: false },
                { where: { purchaseId: id } }
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

export { BuyServices };