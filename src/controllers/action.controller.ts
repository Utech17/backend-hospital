import { Response, Request } from "express"
import { actionServices } from "../services"

export class ActionController {
    constructor() {
    }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await actionServices.getAll()
        return res.status(status).json({
            message,
            data,
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await actionServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await actionServices.create(req.body)
        return res.status(status).json({
            message,
            data,
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await actionServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await actionServices.delete(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }
}