import { Response, Request } from "express";
import { BuyServices } from "../services";

export class BuyController {
    constructor() { }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await BuyServices.getAll();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await BuyServices.getOne(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await BuyServices.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await BuyServices.update(req.body, Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await BuyServices.delete(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };
}