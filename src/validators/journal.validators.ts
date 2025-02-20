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

}
export { JournalValidator };