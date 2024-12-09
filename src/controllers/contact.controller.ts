import { Response, Request } from "express"
import { contactServices } from "../services"

export class ContactController {
    constructor() {
    }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await contactServices.getAll()
        return res.status(status).json({
            message,
            data,
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await contactServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await contactServices.create(req.body)
        return res.status(status).json({
            message,
            data,
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await contactServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await contactServices.delete(Number(id))
        return res.status(status).json({
            message,
            data,
        })
    }
}