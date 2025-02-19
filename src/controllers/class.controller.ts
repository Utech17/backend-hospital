import { Request, Response } from "express";
import { ClassServices } from "../services";

export class ClassController {
  constructor() {}

  // Obtener todas las clases
  all = async (req: Request, res: Response) => {
    const { status, message, data } = await ClassServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  // Obtener una clase por ID
  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await ClassServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };

  // Crear una nueva clase
  create = async (req: Request, res: Response) => {
    const { status, message, data } = await ClassServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  // Actualizar una clase existente
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await ClassServices.update(Number(id), req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  // Eliminar una clase
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await ClassServices.delete(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };
}
