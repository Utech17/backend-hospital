import { Response, Request } from "express";
import { PurchaseDetailsServices } from "../services";

export class PurchaseDetailsController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await PurchaseDetailsServices.getAll();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params; // Espera dos parámetros
        const { status, message, data } = await PurchaseDetailsServices.getByCompositeKey(Number(id_compra), Number(id_producto));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await PurchaseDetailsServices.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    update = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params;
        const { status, message, data } = await PurchaseDetailsServices.update(Number(id_compra), Number(id_producto), req.body);
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id_compra, id_producto } = req.params;
        const { status, message, data } = await PurchaseDetailsServices.delete(Number(id_compra), Number(id_producto));
        return res.status(status).json({
            message,
            data,
        });
    };
}