import { Response, Request } from "express"
import { eventDetailsServices } from "../services"

export class EventDetailsController {
    constructor() {
    }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await eventDetailsServices.getAll()
        return res.status(status).json({
            message,
            data,
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventDetailsServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await eventDetailsServices.create(req.body)
        return res.status(status).json({
            message,
            data,
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventDetailsServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventDetailsServices.delete(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }
}