import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { AccountRecordServices } from "../services";

class AccountRecordValidator {
  public validateAccountRecord = [
    body("type")
        .notEmpty().withMessage("El tipo es requerido")
        .isIn(['debe', 'haber']).withMessage("El tipo debe ser 'debe' o 'haber'"),
    body("name")
        .notEmpty().withMessage("El nombre es requerido")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 100 }).withMessage("El nombre debe tener menos de 100 caracteres"),
    body("amount")
        .notEmpty().withMessage("El monto es requerido")
        .isDecimal().withMessage("El monto debe ser decimal"),
    body("account_id")
        .notEmpty().withMessage("El ID de la cuenta es requerido")
        .isInt().withMessage("El ID de la cuenta debe ser un número entero"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const numericId = Number(id); // Convertir id a número
    const { status, message, data } = await AccountRecordServices.getOne(numericId);
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
}
export { AccountRecordValidator };