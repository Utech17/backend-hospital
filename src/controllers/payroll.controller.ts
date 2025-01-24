import { Request, Response } from "express";
import { PayrollServices } from "../services";

export class PayrollController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await PayrollServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await PayrollServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await PayrollServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await PayrollServices.update(
      Number(id),
      req.body
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await PayrollServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}