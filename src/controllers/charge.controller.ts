import { Request, Response } from "express";
import { ChargeServices } from "../services";

export class ChargeController {
    constructor() {}

    all = async (req: Request, res: Response) => {
        try {
            const { status, message, data } = await ChargeServices.getAll();
            return res.status(status).json({
                message,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };

    one = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status, message, data } = await ChargeServices.getOne(parseInt(id) as number);
            return res.status(status).json({
                message,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const { status, message, data } = await ChargeServices.create(req.body);
            return res.status(status).json({
                message,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status, message, data } = await ChargeServices.update(parseInt(id) as number, req.body);
            return res.status(status).json({
                message,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status, message, data } = await ChargeServices.delete(parseInt(id) as number);
            return res.status(status).json({
                message,
                data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
}