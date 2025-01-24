import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PatientServices } from "../services";

class PatientValidator {
  public validatePatient = [
    body("nickname").notEmpty().withMessage("Nickname is required"),
    body("nickname").isString().withMessage("Nickname must be a string"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("firstName").isString().withMessage("First name must be a string"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("lastName").isString().withMessage("Last name must be a string"),
    body("birthDate")
      .notEmpty()
      .withMessage("Birth date is required")
      .isISO8601()
      .withMessage("Birth date must be a valid date"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("gender").isString().withMessage("Gender must be a string"),
    body("identifier")
      .notEmpty()
      .withMessage("Identifier is required")
      .isString()
      .withMessage("Identifier must be a string"),
    body("registrationDate")
      .optional()
      .isISO8601()
      .withMessage("Registration date must be a valid datetime"),
  ];

  // Middleware para validar la existencia de un paciente
  public validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await PatientServices.getOne(parseInt(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The patient with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { PatientValidator };