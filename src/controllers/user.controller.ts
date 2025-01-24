import { Request, Response } from "express";
import { UserServices } from "../services";

export class UserController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await UserServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await UserServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await UserServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await UserServices.update(parseInt(id) as number,req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await UserServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  
  login = async (req: Request, res: Response) => {

    const { status, message, data } = await UserServices.getByEmail(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  public updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const { message, status: httpStatus, data } = await UserServices.updateStatus(Number(id), status);

      return res.status(httpStatus).json({
        message,
        data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Por favor, contacte al administrador",
      });
    }
  };
}
