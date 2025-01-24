import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { AppointmentServices } from "../services";

class AppointmentValidator {
  public validateAppointment = [
    body("id_patient").notEmpty().withMessage("Patient ID is required"),
    body("id_patient").isNumeric().withMessage("Patient ID must be numeric"),
    body("id_employee").notEmpty().withMessage("Employee ID is required"),
    body("id_employee").isNumeric().withMessage("Employee ID must be numeric"),
    body("appointment_date").notEmpty().withMessage("Appointment date is required"),
    body("appointment_date").isISO8601().withMessage("Appointment date must be a valid date"),
    body("status").notEmpty().withMessage("Status is required"),
    body("status").isIn(["scheduled", "completed", "cancelled"]).withMessage("Status must be one of: scheduled, completed, cancelled"),
    body("area").notEmpty().withMessage("Area is required"),
    body("area").isIn(["general", "specialist"]).withMessage("Area must be one of: general, specialist"),
  ];

  public validateAppointmentUpdate = [
    body("status").notEmpty().withMessage("Status is required"),
    body("status").isIn(["scheduled", "completed", "cancelled"]).withMessage("Status must be one of: scheduled, completed, cancelled"),
  ];

  // Middleware to validate patient existence
  public validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_patient } = req.body;
    const { status, message, data } = await AppointmentServices.getOne(id_patient);
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

  // Middleware to validate employee existence
  public validateEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_employee } = req.body;
    const { status, message, data } = await AppointmentServices.getOne(id_employee);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The employee with ID: ${id_employee} does not exist`,
            path: "id_employee",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { AppointmentValidator };