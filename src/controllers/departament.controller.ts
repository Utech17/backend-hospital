import { Request, Response } from "express";
import { DepartamentServices } from "../services";
export class DepartamentController {
  constructor() {
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await DepartamentServices.getAll();
    return res.status(status).json({
      message, 
      data,
    }); 
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await DepartamentServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await DepartamentServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await DepartamentServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await DepartamentServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
