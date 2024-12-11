import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { UserServices } from "../services";

class UserValidator {
  // Validaciones para crear y actualizar un usuario
  public validateUser = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("nombre").isString().withMessage("El nombre debe ser una cadena de texto"),
    body("apellido").notEmpty().withMessage("El apellido es requerido"),
    body("apellido").isString().withMessage("El apellido debe ser una cadena de texto"),
    body("email").notEmpty().withMessage("El correo electrónico es requerido"),
    body("email").isEmail().withMessage("El correo electrónico debe ser válido"),
    body("contraseña").notEmpty().withMessage("La contraseña es requerida"),
    body("contraseña")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("id_rol").notEmpty().withMessage("El ID de rol es requerido"),
    body("id_rol").isNumeric().withMessage("El ID de rol debe ser numérico"),
  ];

  // Validación para actualizar el estado del usuario (activo/inactivo)
  public validateStatusUpdate = [
    body("status")
      .notEmpty()
      .withMessage("El estado es obligatorio")
      .isBoolean()
      .withMessage("El estado debe ser un valor booleano"),
  ];

  // Middleware para validar la existencia del usuario
  public validateUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params; // ID del usuario en la URL
    const { status, message, data } = await UserServices.getOne(Number(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `El usuario con ID: ${id} no existe`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };

  // Middleware para validar la existencia del correo electrónico único
  public validateUniqueEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const { status, data } = await UserServices.getAll();
    if (status === 200 && data?.users.some((user: any) => user.email === email)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `El correo electrónico: ${email} ya está registrado`,
            path: "email",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { UserValidator };