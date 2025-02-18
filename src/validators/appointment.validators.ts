import type { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { AppointmentServices } from "../services"

class AppointmentValidator {
  public validateAppointment = [
    body("patient_id").notEmpty().withMessage("Patient ID is required"),
    body("patient_id").isNumeric().withMessage("Patient ID must be numeric"),
    body("employee_id").notEmpty().withMessage("Employee ID is required"),
    body("employee_id").isNumeric().withMessage("Employee ID must be numeric"),
    body("appointment_date").notEmpty().withMessage("Appointment date is required"),
    body("appointment_date").isISO8601().withMessage("Appointment date must be a valid date"),
    body("appointment_status").notEmpty().withMessage("Appointment status is required"),
    body("appointment_status")
      .isIn(["Scheduled", "Completed", "Cancelled"])
      .withMessage("Appointment status must be one of: Scheduled, Completed, Cancelled"),
    body("appointment_area").notEmpty().withMessage("Appointment area is required"),
    body("appointment_area")
      .isIn(["General", "Specialty", "Emergency"])
      .withMessage("Appointment area must be one of: General, Specialty, Emergency"),
  ]

  public validateAppointmentUpdate = [
    body("appointment_status").notEmpty().withMessage("Appointment status is required"),
    body("appointment_status")
      .isIn(["Scheduled", "Completed", "Cancelled"])
      .withMessage("Appointment status must be one of: Scheduled, Completed, Cancelled"),
  ]

  // Middleware to validate patient existence
  public validatePatientId = async (req: Request, res: Response, next: NextFunction) => {
    const { patient_id } = req.body
    const { status, message, data } = await AppointmentServices.getOne(patient_id)
    if (status === 500) {
      return res.status(status).json({
        message,
      })
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
      })
    }
    next()
  }

  // Middleware to validate employee existence
  public validateEmployeeId = async (req: Request, res: Response, next: NextFunction) => {
    const { employee_id } = req.body
    const { status, message, data } = await AppointmentServices.getOne(employee_id)
    if (status === 500) {
      return res.status(status).json({
        message,
      })
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The employee with ID: ${employee_id} does not exist`,
            path: "employee_id",
            location: "body",
          },
        ],
      })
    }
    next()
  }
}

export { AppointmentValidator }