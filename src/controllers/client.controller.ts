import { Request, Response } from "express";
import { clientServices } from "../services";

export class ClientController {
    constructor() {}
  
    all = async (req: Request, res: Response) => {
      const { status, message, data } = await clientServices.getAll();
      return res.status(status).json({
        message,
        data,
      });
    };
  
    one = async (req: Request, res: Response) => {
      const {id}=req.params
      const { status, message, data } = await clientServices.getOne(parseInt(id) as number);
      return res.status(status).json({
        message,
        data,
      });
    };
    create = async (req: Request, res: Response) => {
      const { status, message, data } = await clientServices.create(req.body);
      return res.status(status).json({
        message,
        data,
      });
    };
    update = async (req: Request, res: Response) => {
      const {id}=req.params
      const { status, message, data } = await clientServices.update(parseInt(id) as number,req.body);
      return res.status(status).json({
        message,
        data,
      });
    };
  
    delete = async (req: Request, res: Response) => {
      const {id}=req.params
      const { status, message, data } = await clientServices.delete(parseInt(id) as number);
      return res.status(status).json({
        message,
        data,
      });
    };
  };