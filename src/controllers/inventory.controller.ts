import { Response, Request } from 'express';
import { InventoryService } from '../services';

export class InventoryController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await InventoryService.getAllInventorys();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await InventoryService.getOne(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };


    create = async (req: Request, res: Response) => {
        const { status, message, data } = await InventoryService.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };
    
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await InventoryService.update(req.body, Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await InventoryService.delete(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };
}