import { Request, Response } from "express";
import { RequestServices } from "../services";

export class RequestController {
  all = async (req: Request, res: Response) => {
    const { status, message, data } = await RequestServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await RequestServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await RequestServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await RequestServices.update(
      Number(id),
      req.body
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await RequestServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}