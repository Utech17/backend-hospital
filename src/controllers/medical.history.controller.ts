import { Request, Response } from "express";
import { medicalHistoryServices } from "../services";

export class MedicalHistoryController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await medicalHistoryServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await medicalHistoryServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await medicalHistoryServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await medicalHistoryServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await medicalHistoryServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}