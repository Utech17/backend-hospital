import { Request, Response } from "express";
import { conceptServices } from "../services";

export class ConceptController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await conceptServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await conceptServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await conceptServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await conceptServices.update(parseInt(id) as number,req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
}
