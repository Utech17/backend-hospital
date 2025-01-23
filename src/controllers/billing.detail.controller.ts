import { Request, Response } from "express";
import { BillingDetailServices } from "../services";

export class BillingDetailController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await BillingDetailServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingDetailServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await BillingDetailServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingDetailServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingDetailServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}