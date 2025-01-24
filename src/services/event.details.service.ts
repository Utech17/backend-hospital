import { EventDetailsDB } from "../config";
import { EventDetailsInterface } from "../interfaces";

const eventDetailsServices = {
    getAll: async () => {
        try {
            const eventDetails = await EventDetailsDB.findAll({
                where: {
                    status: true
                }
            })

            if (eventDetails.length == 0) {
                return {
                    message: `Records not found`,
                    status: 404,
                    data: {
                        eventDetails,
                    },
                }
            }

            return {
                message: `Records found`,
                status: 200,
                data: {
                    eventDetails,
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
            const eventDetail = await EventDetailsDB.findOne({
                where: {
                    id: id,
                    status: true
                }
            })

            if (!eventDetail) {
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
                        eventDetail,
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
    create: async (data: Partial<EventDetailsInterface>) => {
        try {
            const eventDetail = await EventDetailsDB.create({ ...data })
            return {
                message: `Successful creation`,
                status: 201,
                data: {
                    eventDetail,
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
    update: async (dat: Partial<EventDetailsInterface>, id: number | string) => {
        try {
            await EventDetailsDB.update(dat, { where: { id } })
            const { data } = await eventDetailsServices.getOne(id)

            return {
                message: `Successful upgrade`,
                status: 200,
                data: {
                    eventDetail: data?.eventDetail,
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
            await EventDetailsDB.update(
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
}

export { eventDetailsServices};