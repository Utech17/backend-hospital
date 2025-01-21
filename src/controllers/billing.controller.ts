import { Request, Response } from "express";
import { BillingServices } from "../services";

export class BillingController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await BillingServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { invoiceDetails, ...billingData } = req.body;
    const { status, message, data } = await BillingServices.create(billingData, invoiceDetails);
    return res.status(status).json({
      message,
      data,
    });
  };
  
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { invoiceDetails, ...billingData } = req.body;
    const { status, message, data } = await BillingServices.update(parseInt(id) as number, billingData, invoiceDetails);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}