import { Request, Response } from "express";
import { ContractServices } from "../services";

export class ContractController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await ContractServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await ContractServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await ContractServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await ContractServices.update(parseInt(id) as number,req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
}
