import { Request, Response } from "express";
import { invoiceDetailServices } from "../services";

export class InvoiceDetailController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await invoiceDetailServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await invoiceDetailServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await invoiceDetailServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await invoiceDetailServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await invoiceDetailServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}