import { Model } from "sequelize";
import { ActionDB, EmployeeDB, EventDB, EventDetailsDB, EventTypeDB, MedicalHistoryDB, PatientDB, UserDB } from "../config";
import { EventDetailsInterface } from "../interfaces";

const eventDetailsServices = {
    getAll: async () => {
        try {
            const eventDetails = await EventDetailsDB.findAll({
              include: [{
                model: EventDB,
                include: [
                  {model: MedicalHistoryDB, 
                  include:[{ 
                    model: PatientDB}]}, 
                    {model: EmployeeDB, 
                      include: [{ model: UserDB }]},
                    {model: EventTypeDB}],
                },{ 
                  model: ActionDB }],
            });

            if (eventDetails.length == 0) {
                return {
                    message: "No se encontraron registros",
                    status: 404,
                    data: {
                        eventDetails,
                    },
                };
            }

            return {
                message: "Registros encontrados",
                status: 200,
                data: {
                    eventDetails,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                message: "Contacte al administrador: error",
                status: 500,
            };
        }
    },
    getOne: async (id: number | string) => {
        try {
            const eventDetail = await EventDetailsDB.findOne({
                where: {
                    id: id,
                },
                include: [{
                model: EventDB,
                include: [
                  {model: MedicalHistoryDB, 
                  include:[{ 
                    model: PatientDB}]}, 
                    {model: EmployeeDB, 
                      include: [{ model: UserDB }]},
                    {model: EventTypeDB}],
                },{ 
                  model: ActionDB }],
            });

            if (!eventDetail) {
                return {
                    message: "Registro no encontrado",
                    status: 404,
                    data: {},
                };
            } else {
                return {
                    message: "Registro encontrado",
                    status: 200,
                    data: {
                        eventDetail,
                    },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: "Contacte al administrador: error",
                status: 500,
            };
        }
    },
    create: async (data: Partial<EventDetailsInterface>) => {
        try {
            const eventDetail = await EventDetailsDB.create({ ...data });
            return {
                message: "Creación exitosa",
                status: 201,
                data: {
                    eventDetail,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                message: "Contacte al administrador: error",
                status: 500,
            };
        }
    },
    update: async (dat: Partial<EventDetailsInterface>, id: number | string) => {
        try {
            await EventDetailsDB.update(dat, { where: { id } });
            const { data } = await eventDetailsServices.getOne(id);

            return {
                message: "Actualización exitosa",
                status: 200,
                data: {
                    eventDetail: data?.eventDetail,
                },
            };
        } catch (error) {
            console.log(error);
            return {
                message: "Contacte al administrador: error",
                status: 500,
            };
        }
    },
    delete: async (id: number | string) => {
        try {
            await EventDetailsDB.update(
                {
                    deletedAt: new Date(),
                },
                { where: { id } }
            );
            return {
                message: "Eliminación exitosa",
                status: 200,
            };
        } catch (error) {
            return {
                message: "Contacte al administrador: error",
                status: 500,
            };
        }
    },
};

export { eventDetailsServices };