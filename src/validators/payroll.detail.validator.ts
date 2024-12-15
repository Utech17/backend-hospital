import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { payrollDetailServices, EmployeeServices } from "../services";

class PayrollDetailValidator {
  // Validador para la creación de un detalle de nómina
  public validatePayrollDetail = [
    body("employee_id").notEmpty().withMessage("Employee ID is required"),
    body("employee_id").isNumeric().withMessage("Employee ID must be numeric"),
    body("payroll_date")
      .notEmpty()
      .withMessage("Payroll date is required"),
    body("payroll_date")
      .isISO8601()
      .withMessage("Payroll date must be a valid date"),
    body("amount")
      .notEmpty()
      .withMessage("Amount is required")
      .withMessage("Amount must be a positive number"),
  ];

  // Validador para la actualización de la cantidad
  public validateAmountUpdate = [
    body("amount")
      .notEmpty()
      .withMessage("Amount is required")
      .withMessage("Amount must be a positive number"),
  ];

  // Middleware para validar si el empleado existe
  public validateEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { employee_id } = req.body;
    const { status, message, data } = await EmployeeServices.getOne(
      employee_id
    );
    if (status === 500) {
      return res.status(status).json({
        message,
      });
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
      });
    }
    next();
  };
}

export { PayrollDetailValidator };