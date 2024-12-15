import { Response, Request } from 'express';
import { OrganizationalUnitsService } from '../services';

export class OrganizationalUnitsController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await OrganizationalUnitsService.getAll();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await OrganizationalUnitsService.getOne(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    find = async (req: Request, res: Response) => {
        const { units_name } = req.params;
        const { status, message, data } = await OrganizationalUnitsService.findByName(String(units_name));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await OrganizationalUnitsService.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };
    
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await OrganizationalUnitsService.update(req.body, Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await OrganizationalUnitsService.delete(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };
}