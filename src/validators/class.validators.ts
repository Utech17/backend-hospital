import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ClassServices } from "../services";

class ClassValidator {
  // Validaciones para crear o actualizar una clase
  public validateClase = [
    body("des_clase").notEmpty().withMessage("Descripción de clase es requerida"),
    body("des_clase").isString().withMessage("Descripción de clase debe ser un string"),
    body("status").notEmpty().withMessage("El status es requerido"),
    body("status").isInt().withMessage("El status debe ser un número entero"),
  ];

  // Middleware para verificar si el id existe en la base de datos
  public verifyId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await ClassServices.getOne(id);
    
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      if (id) {
        return res.status(404).json({
          errors: [
            {
              type: "field",
              msg: `El parámetro id: ${id}, no existe en la base de datos.`,
              path: "id",
              location: "param",
            },
          ],
        });
      }
    }
    next();
  };

  // Middleware para verificar si el nombre de la clase ya está en uso
  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { des_clase } = req.body;
    const { status, message, data } = await ClassServices.findByName(des_clase);

    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const clase: any = data?.clase;
      
      if (id) {
        // Caso de actualización
        if (id != clase.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `El nombre en uso : ${des_clase}, para el registro actual`,
                path: "des_clase",
                location: "body",
              },
            ],
          });
        }
      } else {
        // Caso de creación de nuevo registro
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `El nombre en uso : ${des_clase}, para la nueva clase`,
              path: "des_clase",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}

export { ClassValidator };