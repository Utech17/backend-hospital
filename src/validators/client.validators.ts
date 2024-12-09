import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { clientServices } from "../services";

class ClientValidator {
  public validateClient = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be string"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("last_name").isString().withMessage("Last name must be string"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email must be email"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("phone_number").isString().withMessage("Phone number must be string"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await clientServices.getOne(id);
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
              msg: `El parametro id : ${id}, no existe en la base de datos.`,
              path: "id",
              location: "param",
            },
          ],
        });
      }
    }
    next();
  };

  public validateIfEmailIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { email } = req.body;
    const { status, message, data } = await clientServices.getByEmail(email);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const email: any = data?.client;
      if (id) {

        if (id != email.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Email en uso : ${email}, para el registro actual`,
                path: "email",
                location: "body",
              },
            ],
          });
        }
      } else {

        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Email en uso : ${email}, para el cliente actual`,
              path: "email",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };

  public validateIfPhone_numberIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { phone_number } = req.body;
    const { status, message, data } = await clientServices.getByPhone_number(phone_number);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const phone_number: any = data?.client;
      if (id) {

        if (id != phone_number.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Numero de telefono en uso : ${phone_number}, para el registro actual`,
                path: "phone_number",
                location: "body",
              },
            ],
          });
        }
      } else {

        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Numero de telefono en uso : ${phone_number}, para el cliente actual`,
              path: "phone_number",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { ClientValidator };