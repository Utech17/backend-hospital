import type { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { AppointmentServices } from "../services"

class AppointmentValidator {
  public validateAppointment = [
    body("patient_id").notEmpty().withMessage("El ID del paciente es requerido"),
    body("patient_id").isNumeric().withMessage("El ID del paciente debe ser numérico"),
    body("employee_id").notEmpty().withMessage("El ID del empleado es requerido"),
    body("employee_id").isNumeric().withMessage("El ID del empleado debe ser numérico"),
    body("appointment_date").notEmpty().withMessage("La fecha de la cita es requerida"),
    body("appointment_date").isISO8601().withMessage("La fecha debe ser válida"),
    body("appointment_area").notEmpty().withMessage("El área de la cita es requerida"),
    body("appointment_area")
      .isIn(["General", "Especialidad", "Emergencia"])
      .withMessage("El área debe ser una de: General, Especialidad, Emergencia"),
  ]

  // Middleware para validar existencia del paciente
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
            msg: `El paciente con ID: ${patient_id} no existe`,
            path: "patient_id",
            location: "body",
          },
        ],
      })
    }
    next()
  }

  // Middleware para validar existencia del empleado
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
            msg: `El empleado con ID: ${employee_id} no existe`,
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