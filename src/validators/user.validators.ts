import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RoleService, UserServices } from "../services";

class UserValidator {
  // Validaciones para crear y actualizar un usuario
  public validateUser = [
    body("firstName").notEmpty().withMessage("El nombre es requerido"),
    body("firstName").isString().withMessage("El nombre debe ser una cadena de texto"),
    body("lastName").notEmpty().withMessage("El apellido es requerido"),
    body("lastName").isString().withMessage("El apellido debe ser una cadena de texto"),
    body("email").notEmpty().withMessage("El correo electrónico es requerido"),
    body("email").isEmail().withMessage("El correo electrónico debe ser válido"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("role_id").notEmpty().withMessage("El ID de rol es requerido"),
    body("role_id").isNumeric().withMessage("El ID de rol debe ser numérico"),
  ];

  public validateLogin = [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email must be email"),
    body("password").notEmpty().withMessage("Passowrd is required"),
    body("password").isString().withMessage("Passowrd must be string"),
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

  //un middleware en el caso de campo unico
  public validateRoleId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const{ role_id } = req.body;
    const { status, message, data } = await RoleService.getOne(role_id);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `El role id : ${role_id}, no existe`,
                path: "role_id",
                location: "body",
              },
            ],
          });
    }
    next();
  };
}

export { UserValidator };