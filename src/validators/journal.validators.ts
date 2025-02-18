import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { JournalServices } from "../services";

class JournalValidator {
  public validateJournal = [
    body("request_id")
        .notEmpty().withMessage("El ID de solicitud es requerido")
        .isInt().withMessage("El ID de solicitud debe ser un número entero"),
    body("account_record_id")
        .notEmpty().withMessage("El ID del registro contable es requerido")
        .isInt().withMessage("El ID del registro contable debe ser un número entero"),
    body("status")
        .optional()
        .isBoolean().withMessage("El estado debe ser verdadero o falso"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await JournalServices.getOne(Number(id));
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
export { JournalValidator };