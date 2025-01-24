import { Response, Request } from "express";
import { BuyDetailsServices } from "../services";

export class BuyDetailsController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await BuyDetailsServices.getAll();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params; // Espera dos parámetros
        const { status, message, data } = await BuyDetailsServices.getByCompositeKey(Number(id_compra), Number(id_producto));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await BuyDetailsServices.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    update = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params;
        const { status, message, data } = await BuyDetailsServices.update(Number(id_compra), Number(id_producto), req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params;
        const { status, message, data } = await BuyDetailsServices.delete(Number(id_compra), Number(id_producto));
        return res.status(status).json({
            message,
            data,
        });
    };
}