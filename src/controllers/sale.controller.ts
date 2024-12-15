import { Response, Request } from "express";
import { SaleServices } from "../services";

export class SaleController {
    constructor() { }

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await SaleServices.getAll();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await SaleServices.getOne(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await SaleServices.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await SaleServices.update(req.body, Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await SaleServices.delete(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };
}
