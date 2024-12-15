import { Request, Response } from "express";
import { AccountRecordServices } from "../services";

export class AccountRecordController {
  all = async (req: Request, res: Response) => {
    const { status, message, data } = await AccountRecordServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await AccountRecordServices.getOne(
      Number(id)
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await AccountRecordServices.create(
      req.body
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await AccountRecordServices.update(
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
    const { status, message, data } = await AccountRecordServices.delete(
      Number(id)
    );
    return res.status(status).json({
      message,
      data,
    });
  };
}