import { EventTypeDB } from "../config";
import { EventTypeInterface } from "../interfaces";

const eventTypeServices = {
    getAll: async () => {
        try {
            const eventTypes = await EventTypeDB.findAll({
                where: {
                    status: true
                }
            })

            if (eventTypes.length == 0) {
                return {
                    message: `Records not found`,
                    status: 404,
                    data: {
                        eventTypes,
                    },
                }
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                    eventTypes,
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
            const eventType = await EventTypeDB.findOne({
                where: {
                    id: id,
                    status: true
                }
            })

            if (!eventType) {
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
                        eventType,
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
    create: async (data: Partial<EventTypeInterface>) => {
        data.event_name = data.event_name?.toLowerCase()
        try {
            const eventType = await EventTypeDB.create({ ...data })
            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    eventType,
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
    update: async (dat: Partial<EventTypeInterface>, id: number | string) => {
        dat.event_name = dat.event_name?.toLowerCase()
        try {
            await EventTypeDB.update(dat, { where: { id } })
            const { data } = await eventTypeServices.getOne(id)

            return {
                message: `Successful upgrade`,
                status: 200,
                data: {
                    eventType: data?.eventType,
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
            await EventTypeDB.update(
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
                    role: null,
                },
            }
        } catch (error) {
            return {
                message: `Contact the administrator: error`,
                status: 500,
            }
        }
    },
    findByName: async (event_name: string) => {
        try {
            const eventType = await EventTypeDB.findAll({ where: { event_name } });
            if (eventType.length === 0) {
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
                        eventType: eventType[0],
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

export { eventTypeServices};