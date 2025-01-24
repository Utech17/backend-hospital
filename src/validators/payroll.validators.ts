import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PayrollServices } from "../services";

class PayrollValidator {
  public validatePayroll = [
    body("employee_id")
      .notEmpty()
      .withMessage("Employee ID is required")
      .isNumeric()
      .withMessage("Employee ID must be a number"),
    body("start_date")
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Start date must be a valid date"),
    body("end_date")
      .notEmpty()
      .withMessage("End date is required")
      .isISO8601()
      .withMessage("End date must be a valid date"),
    body("gross_salary")
      .notEmpty()
      .withMessage("Gross salary is required")
      .isFloat({ min: 0 })
      .withMessage("Gross salary must be a positive number"),
    body("deductions")
      .notEmpty()
      .withMessage("Deductions are required")
      .isFloat({ min: 0 })
      .withMessage("Deductions must be a positive number"),
    body("net_salary")
      .notEmpty()
      .withMessage("Net salary is required")
      .isFloat({ min: 0 })
      .withMessage("Net salary must be a positive number"),
    
];

  // Middleware para validar la existencia de un registro de nómina por ID
  public validatePayrollId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_payroll } = req.params; // Supone que el ID se envía como parámetro
    const { status, message, data } = await PayrollServices.getOne(id_payroll);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The payroll record with ID: ${id_payroll} does not exist`,
            path: "id_payroll",
            location: "params",
          },
        ],
      });
    }
    next();
  };
  
  public validateIfNameIsUsed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const payrollExists = await PayrollServices.findByName(name); 
    if (payrollExists) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The payroll with name ${name} already exists`,
            path: "name",
            location: "body",
          },
        ],
      });
    }
    next();
  };

  public validateIfIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const payroll = await PayrollServices.getOne(id);
    if (!payroll) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `The payroll with ID ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { PayrollValidator };