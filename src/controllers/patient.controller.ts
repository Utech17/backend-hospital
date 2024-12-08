import { Request, Response } from "express";
import { patientServices } from "../services";

export class PatientController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await patientServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await patientServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await patientServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await patientServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await patientServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}