import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestTypeServices } from "../services";

class RequestTypeValidator {
  public validateRequestType = [
    body("name")
        .notEmpty().withMessage("El nombre es requerido")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 50 }).withMessage("El nombre debe tener menos de 50 caracteres"),
    body("bot")
        .notEmpty().withMessage("El campo bot es requerido")
        .isBoolean().withMessage("El campo bot debe ser verdadero o falso"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await RequestTypeServices.getOne(Number(id));
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `The id ${id} does not exist in the database.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
    next();
  };

  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { name } = req.body;
    const { status, message, data } = await RequestTypeServices.findByName(name);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 200) {
      const requestType = data?.requestType;
      if (id && requestType && id !== (requestType as any).request_type_id) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `The name ${name} is already in use.`,
              path: "name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { RequestTypeValidator };