import { ActionDB } from "../config";
import { ActionInterface } from "../interfaces";

const actionServices = {
    getAll: async () => {
        try {
            const actions = await ActionDB.findAll({
                where: {
                    status: true
                }
            })

            if (actions.length == 0) {
                return {
                    message: `Records not found`,
                    status: 404,
                    data: {
                        actions,
                    },
                }
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                    actions,
                },
            }
        } catch (error) {
            console.log(error)
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    getOne: async (id: number | string) => {
        try {
            const action = await ActionDB.findOne({
                where: {
                    id: id,
                    status: true
                }
            })

            if (!action) {
                return {
                    message: `Record not found`,
                    status: 404,
                    data: {},
                }
            } else {
                return {
                    message: `Record found`,
                    status: 200,
                    data: {
                        action,
                    },
                }
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    create: async (data: Partial<ActionInterface>) => {
        data.name_actions = data.name_actions?.toLowerCase()
        try {
            const action = await ActionDB.create({ ...data })
            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    action,
                },
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    update: async (dat: Partial<ActionInterface>, id: number | string) => {
        dat.name_actions = dat.name_actions?.toLowerCase()
        try {
            await ActionDB.update(dat, { where: { id } })
            const { data } = await actionServices.getOne(id)

            return {
                message: `Successful upgrade`,
                status: 200,
                data: {
                    action: data?.action,
                },
            }
        } catch (error) {
            console.log(error)
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    delete: async (id: number | string) => {
        try {
            await ActionDB.update(
                {
                    status: false,
                    deletedAt: new Date(),
                },
                { where: { id } }
            )
            return {
                message: `Successful removal`,
                status: 204,
                data: {
                    action: null,
                },
            }
        } catch (error) {
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    findByName: async (name_actions: string) => {
        try {
            const action = await ActionDB.findAll({ where: { name_actions } });
            if (action.length === 0) {
                return {
                    message: `Record not found`,
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: `Record found`,
                    status: 200,
                    data: {
                        action: action[0],
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
}

export { actionServices};