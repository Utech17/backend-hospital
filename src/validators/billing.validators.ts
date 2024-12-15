import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { patientServices, clientServices } from "../services";

class BillingValidator {
  public validateBilling = [
    body("id_patient")
      .notEmpty()
      .withMessage("Patient ID is required")
      .isNumeric()
      .withMessage("Patient ID must be numeric"),
    body("id_client")
      .notEmpty()
      .withMessage("Client ID is required")
      .isNumeric()
      .withMessage("Client ID must be numeric"),
    body("billing_date")
      .notEmpty()
      .withMessage("Billing date is required")
      .isISO8601()
      .withMessage("Billing date must be a valid date"),
    body("billing_status")
      .notEmpty()
      .withMessage("Billing status is required")
      .isIn(["pending", "paid", "cancelled"])
      .withMessage("Billing status must be 'pending', 'paid', or 'cancelled'"),
  ];

  // Middleware to validate patient existence
  public validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_patient } = req.body;
    const { status, message } = await patientServices.getOne(id_patient);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The patient with ID: ${id_patient} does not exist`,
            path: "id_patient",
            location: "body",
          },
        ],
      });
    }
    next();
  };

  // Middleware to validate client existence
  public validateClientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_client } = req.body;
    const { status, message } = await clientServices.getOne(id_client);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The client with ID: ${id_client} does not exist`,
            path: "id_client",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { BillingValidator };