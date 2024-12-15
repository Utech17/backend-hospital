import { Request, Response } from "express";
import { payrollDetailServices } from "../services";

export class PayrollDetailController {
  constructor() {}

  // Obtener todos los detalles de nómina
  all = async (req: Request, res: Response) => {
    const { status, message, data } = await payrollDetailServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  // Obtener un detalle de nómina por ID
  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await payrollDetailServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  // Crear un nuevo detalle de nómina
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await payrollDetailServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  // Actualizar un detalle de nómina por ID
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await payrollDetailServices.update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  // Eliminar un detalle de nómina por ID
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await payrollDetailServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}