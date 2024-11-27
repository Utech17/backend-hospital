import { Request, Response } from "express";
import { userServices } from "../services";

export class UserController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await userServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await userServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.update(parseInt(id) as number,req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await userServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  
  login = async (req: Request, res: Response) => {

    const { status, message, data } = await userServices.getByEmail(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
}
