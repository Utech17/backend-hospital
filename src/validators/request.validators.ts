import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestServices } from "../services";

class RequestValidator {
  public validateRequest = [
    body("description")
        .notEmpty().withMessage("La descripción es requerida")
        .isString().withMessage("La descripción debe ser texto"),
    body("request_type_id")
        .notEmpty().withMessage("El ID del tipo de solicitud es requerido")
        .isInt().withMessage("El ID del tipo de solicitud debe ser un número entero"),
    body("amount")
        .notEmpty().withMessage("El monto es requerido")
        .isDecimal().withMessage("El monto debe ser decimal"),
    body("status")
        .notEmpty().withMessage("El estado es requerido")
        .isIn(['pendiente', 'aprobada', 'rechazada'])
        .withMessage("El estado debe ser 'pendiente', 'aprobada' o 'rechazada'")
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { request_id } = req.params;
    const { status, message, data } = await RequestServices.getOne(Number(request_id));
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `The id ${request_id} does not exist in the database.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
    next();
  };
}
export { RequestValidator };