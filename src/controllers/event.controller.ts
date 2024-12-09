import { Response, Request } from "express"
import { eventServices } from "../services"

export class EventController {
    constructor() {
    }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await eventServices.getAll()
        return res.status(status).json({
            message,
            data,
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await eventServices.create(req.body)
        return res.status(status).json({
            message,
            data,
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await eventServices.delete(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }
}