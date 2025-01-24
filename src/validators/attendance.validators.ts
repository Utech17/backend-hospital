import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { attendanceServices } from "../services";

class AttendanceValidator {
  public validateAttendance = [
    body("id_employee").notEmpty().withMessage("Employee ID is required"),
    body("id_employee").isNumeric().withMessage("Employee ID must be numeric"),
    body("date").notEmpty().withMessage("Attendance date is required"),
    body("date").isISO8601().withMessage("Attendance date must be a valid date"),
    body("entry_time").notEmpty().withMessage("Entry time is required"),
    body("entry_time").isISO8601().withMessage("Entry time must be a valid time format (ISO8601)"),
    body("exit_time").optional().isISO8601().withMessage("Exit time must be a valid time format (ISO8601)"),
    body("worked_hours").optional().isFloat({ min: 0 }).withMessage("Worked hours must be a number greater than or equal to 0"),
  ];

  // Middleware to validate employee existence
  public validateEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_employee } = req.body;
    const { status, message, data } = await attendanceServices.getOne(id_employee);
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

export { AttendanceValidator };