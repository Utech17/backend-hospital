import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { roleServices } from "../services";

class UserValidator {
  public validateUser = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be string"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email must be email"),
    body("password").notEmpty().withMessage("Passowrd is required"),
    body("password").isString().withMessage("Passowrd must be string"),
    body("role_id").notEmpty().withMessage("Role id is required"),
    body("role_id").isNumeric().withMessage("Role Id must be numeric"),
  ];
  public validateLogin = [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email must be email"),
    body("password").notEmpty().withMessage("Passowrd is required"),
    body("password").isString().withMessage("Passowrd must be string"),
  ];

  //un middleware en el caso de campo unico
  public validateRoleId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const{ role_id } = req.body;
    const { status, message, data } = await roleServices.getOne(role_id);
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