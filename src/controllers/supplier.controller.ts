import { Request, Response } from "express";
import { supplierServices } from "../services";

export class SupplierController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await supplierServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await supplierServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await supplierServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await supplierServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await supplierServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}