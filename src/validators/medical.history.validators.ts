import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { medicalHistoryServices, PatientServices } from "../services";

class MedicalHistoryValidator {
  public validateMedicalHistory = [
    body("patient_id").notEmpty().withMessage("Patient ID is required"),
    body("patient_id").isNumeric().withMessage("Patient ID must be numeric"),
    body("admission_date").notEmpty().withMessage("Admission date is required"),
    body("admission_date").isDate().withMessage("Admission date must be a valid date"),
    body("diagnosis").notEmpty().withMessage("Diagnosis is required"),
    body("diagnosis").isString().withMessage("Diagnosis must be a string"),
    body("treatment").notEmpty().withMessage("Treatment is required"),
    body("treatment").isString().withMessage("Treatment must be a string"),
  ];

  public validateDischarge = [
    body("discharge_date").notEmpty().withMessage("Discharge date is required"),
    body("discharge_date").isDate().withMessage("Discharge date must be a valid date"),
  ];

  // Middleware to validate patient existence
  public validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { patient_id } = req.body;
    const { status, message, data } = await PatientServices.getOne(patient_id);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The patient with ID: ${patient_id} does not exist`,
            path: "patient_id",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { MedicalHistoryValidator };