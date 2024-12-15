import { Response, Request } from "express"
import { eventTypeServices } from "../services"

export class EventTypeController {
    constructor() {
    }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await eventTypeServices.getAll()
        return res.status(status).json({
            message,
            data,
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventTypeServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await eventTypeServices.create(req.body)
        return res.status(status).json({
            message,
            data,
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventTypeServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventTypeServices.delete(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }
}