import { ContactDB } from "../config"
import { ContactInterface } from "../interfaces"

const contactServices = {
    getAll: async () => {
        try {
            const events = await ContactDB.findAll({
                where: {
                    status: true
                }
            })

            if (events.length == 0) {
                return {
                    message: `Registros no encontrados`,
                    status: 404,
                    data: {
                        events,
                    },
                }
            }

            return {
                message: `Registros encontrados`,
                status: 200,
                data: {
                    events,
                },
            }
        } catch (error) {
            console.log(error)
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            }
        }
    },
    getOne: async (id: number | string) => {
        try {
            const event = await ContactDB.findOne({
                where: {
                    id: id,
                    status: true
                }
            })

            if (!event) {
                return {
                    message: `Registro no encontrado`,
                    status: 404,
                    data: {},
                }
            } else {
                return {
                    message: `Registro encontrado`,
                    status: 200,
                    data: {
                        event,
                    },
                }
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            }
        }
    },
    create: async (data: Partial<ContactInterface>) => {
        data.name = data.name?.toLowerCase()
        data.lastName = data.lastName?.toLowerCase();
        try {
            const event = await ContactDB.create({ ...data })
            return {
                message: `Creación exitosa`,
                status: 201,
                data: {
                    event,
                },
            }
        } catch (error) {
            console.log(error);
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            }
        }
    },
    update: async (dat: Partial<ContactInterface>, id: number | string) => {
        dat.name = dat.name?.toLowerCase()
        dat.lastName = dat.lastName?.toLowerCase();
        try {
            await ContactDB.update(dat, { where: { id } })
            const { data } = await contactServices.getOne(id)

            return {
                message: `Actualización exitosa`,
                status: 200,
                data: {
                    event: data?.event,
                },
            }
        } catch (error) {
            console.log(error)
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            }
        }
    },
    delete: async (id: number | string) => {
        try {
            await ContactDB.update(
                {
                    status: false,
                    deletedAt: new Date(),
                },
                { where: { id } }
            )
            return {
                message: `Eliminación exitosa`,
                status: 204,
                data: {
                    role: null,
                },
            }
        } catch (error) {
            return {
                message: `Contacte con el administrador: error`,
                status: 500,
            }
        }
    },
}

export {
    contactServices
}