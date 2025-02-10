import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PayrollServices } from "../services";
import path from "path";
import { EmployeeDB, PayrollDB } from "../config";

class PayrollValidator {
  public validatePayroll = [
    body("employee_id")
      .notEmpty()
      .withMessage("Employee ID is required")
      .isNumeric()
      .withMessage("Employee ID must be a number"),
    body("startDate")
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Start date must be a valid date"),
    body("endDate")
      .notEmpty()
      .withMessage("End date is required")
      .isISO8601()
      .withMessage("End date must be a valid date"),
    body("grossSalary")
      .notEmpty()
      .withMessage("Gross salary is required")
      .isDecimal()
      .withMessage("Gross salary must be a positive number"),
    body("deductions")
      .notEmpty()
      .withMessage("Deductions are required")
      .isDecimal()
      .withMessage("Deductions must be a positive number"),
    body("netSalary")
      .notEmpty()
      .withMessage("Net salary is required")
      .isDecimal()
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
  public validateCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { employee_id, startDate, endDate, grossSalary, deductions, netSalary } = req.body;
  
    // Verificar que todos los campos estén presentes
    if (!employee_id || !startDate || !endDate || !grossSalary || !deductions || !netSalary) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "All fields are required",
            path: "fields",
            location: "body",
          },
        ],
      });
    }
  
    // Verificar si el employee_id existe en la tabla employees
    const employee = await EmployeeDB.findByPk(employee_id);
    if (!employee) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `Employee with id ${employee_id} does not exist. Please create the employee first.`,
            path: "employee_id",
            location: "body",
          },
        ],
      });
    }
  
    // Verificar que las fechas sean válidas
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "startDate and endDate must be valid dates",
            path: "dates",
            location: "body",
          },
        ],
      });
    }
  
    // Verificar que los salarios sean números decimales
    if (isNaN(parseFloat(grossSalary)) || isNaN(parseFloat(deductions)) || isNaN(parseFloat(netSalary))) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "grossSalary, deductions, and netSalary must be decimal numbers",
            path: "salary_fields",
            location: "body",
          },
        ],
      });
    }
  
    // Validar que las fechas tengan sentido lógico
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "startDate must be earlier than endDate",
            path: "startDate",
            location: "body",
          },
        ],
      });
    }
  
    // Validar que netSalary sea consistente con grossSalary y deductions
    if (parseFloat(grossSalary) - parseFloat(deductions) !== parseFloat(netSalary)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "netSalary must be equal to grossSalary minus deductions",
            path: "netSalary",
            location: "body",
          },
        ],
      });
    }
  
    next();
  };
  public validateUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { employee_id, startDate, endDate, grossSalary, deductions, netSalary } = req.body;

    // Verificar que el registro de nómina exista
    const payroll = await PayrollDB.findByPk(id);
    if (!payroll) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `Payroll record with id ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }

    // Verificar que todos los campos estén presentes
    if (!employee_id || !startDate || !endDate || !grossSalary || !deductions || !netSalary) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "All fields are required",
            path: "fields",
            location: "body",
          },
        ],
      });
    }

    // Verificar si el employee_id existe en la tabla employees
    const employee = await EmployeeDB.findByPk(employee_id);
    if (!employee) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `Employee with id ${employee_id} does not exist. Please create the employee first.`,
            path: "employee_id",
            location: "body",
          },
        ],
      });
    }

    // Verificar que las fechas sean válidas
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "startDate and endDate must be valid dates",
            path: "dates",
            location: "body",
          },
        ],
      });
    }

    // Verificar que los salarios sean números decimales
    if (isNaN(parseFloat(grossSalary)) || isNaN(parseFloat(deductions)) || isNaN(parseFloat(netSalary))) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "grossSalary, deductions, and netSalary must be decimal numbers",
            path: "salary_fields",
            location: "body",
          },
        ],
      });
    }

    // Validar que las fechas tengan sentido lógico
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "startDate must be earlier than endDate",
            path: "startDate",
            location: "body",
          },
        ],
      });
    }

    // Validar que netSalary sea consistente con grossSalary y deductions
    if (parseFloat(grossSalary) - parseFloat(deductions) !== parseFloat(netSalary)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "netSalary must be equal to grossSalary minus deductions",
            path: "netSalary",
            location: "body",
          },
        ],
      });
    }

    next();
  };
}

export { PayrollValidator };