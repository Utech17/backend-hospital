import { Request, Response } from "express";
import { inventoryMovementServices } from "../services";

export class InventoryMovementController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await inventoryMovementServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await inventoryMovementServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await inventoryMovementServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await inventoryMovementServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await inventoryMovementServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}