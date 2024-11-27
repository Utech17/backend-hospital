import { Request, Response } from "express";
import { roleServices } from "../services";
export class RoleController {
  constructor() {
    
  }

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await roleServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await roleServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await roleServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };
  update = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await roleServices.update(Number(id),req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const {id}=req.params
    const { status, message, data } = await roleServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
  
  reportExcel = async (req: Request, res: Response) => {
    const { status, message, data } = await roleServices.reportToExcelRoles();
    return res.status(status).json({
      message,
      data,
    });
  };
}
