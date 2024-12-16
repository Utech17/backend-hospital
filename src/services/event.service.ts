import { db, EventDB, EventDetailsDB } from "../config";
import { EventInterface, EventDetailsInterface } from "../interfaces";

const eventServices = {
    getAll: async () => {
        try {
            const events = await EventDB.findAll({
                where: {
                    status: true
                },
                include: [{
                    model: EventDetailsDB,
                    where: { status: true }
                }]
            });

            if (events.length === 0) {
                return {
                    message: `Registros no encontrados`,
                    status: 404,
                    data: {
                        events,
                    },
                };
            }

            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    events,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            };
        }
    },
    getOne: async (id: number | string) => {
        try {
            const event = await EventDB.findOne({
                where: {
                    id: id,
                    status: true
                },
                include: [{
                    model: EventDetailsDB,
                    where: { status: true }
                }]
            });

            if (!event) {
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
                        event,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            };
        }
    },
    create: async (data: Partial<EventInterface>, eventDetails: EventDetailsInterface[]) => {
        const transaction = await db.transaction();
        try {
            const event = await EventDB.create({ ...data }, { transaction });

            if (eventDetails.length > 0) {
                const eventDetailsData = eventDetails.map((detail) => ({
                    id_events: event.dataValues.id,
                    id_actions: detail.id_actions,
                    value_detail: detail.value_detail,
                }));

                await EventDetailsDB.bulkCreate(eventDetailsData, { transaction });
            }

            await transaction.commit();

            return {
                message: "Creación exitosa",
                status: 201,
                data: {
                    event,
                },
            };
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return {
                message: "Contacte con el administrador: error",
                status: 500,
            };
        }
    },
    update: async (dat: Partial<EventInterface>, id: number | string, eventDetails: EventDetailsInterface[]) => {
        const transaction = await db.transaction();
        try {
            await EventDB.update(dat, { where: { id }, transaction });

            await EventDetailsDB.destroy({ where: { id_events: id }, transaction });

            if (eventDetails.length > 0) {
                const eventDetailsData = eventDetails.map((detail) => ({
                    id_events: id,
                    id_actions: detail.id_actions,
                    value_detail: detail.value_detail,
                }));

                await EventDetailsDB.bulkCreate(eventDetailsData, { transaction });
            }

            await transaction.commit();

            return {
                message: "Actualización exitosa",
                status: 200,
                data: {
                    event: await eventServices.getOne(id),
                },
            };
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return {
                message: "Contacte con el administrador: error",
                status: 500,
            };
        }
    },
    delete: async (id: number | string) => {
        const transaction = await db.transaction();
        try {
            await EventDetailsDB.update(
                { status: false, deletedAt: new Date() },
                { where: { id_events: id }, transaction }
            );

            await EventDB.update(
                { status: false, deletedAt: new Date() },
                { where: { id }, transaction }
            );

            await transaction.commit();

            return {
                message: "Eliminación exitosa",
                status: 204,
                data: null,
            };
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return {
                message: "Contacte con el administrador: error",
                status: 500,
            };
        }
    },
};

export { eventServices };