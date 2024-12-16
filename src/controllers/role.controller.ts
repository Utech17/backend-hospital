import { Response, Request } from 'express';
import { RoleService } from '../services';

export class RoleController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        const { status, message, data } = await RoleService.getAllRoles();
        return res.status(status).json({
            message,
            data,
        });
    };

    one = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await RoleService.getOne(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    find = async (req: Request, res: Response) => {
        const { role_name } = req.params;
        const { status, message, data } = await RoleService.findByName(String(role_name));
        return res.status(status).json({
            message,
            data,
        });
    };

    create = async (req: Request, res: Response) => {
        const { status, message, data } = await RoleService.create(req.body);
        return res.status(status).json({
            message,
            data,
        });
    };
    
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await RoleService.update(req.body, Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };

    delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status, message, data } = await RoleService.delete(Number(id));
        return res.status(status).json({
            message,
            data,
        });
    };
}