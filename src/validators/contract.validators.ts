import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ContractServices, EmployeeServices } from "../services";

class ContractValidator {
  public validateContract = [
    body("id_employee").notEmpty().withMessage("Id employee is required"),
    body("id_employee").isNumeric().withMessage("Id employee must be numeric"),
    body("id_workingDay").notEmpty().withMessage("Id working day is required"),
    body("id_workingDay").isNumeric().withMessage("Id working day must be numeric"),
    body("id_charge").notEmpty().withMessage("Id charge is required"),
    body("id_charge").isNumeric().withMessage("Id charge must be numeric"),
    body("start_date").notEmpty().withMessage("Start date is required"),
    body("end_date").notEmpty().withMessage("End date is required"),
    body("base_salary").notEmpty().withMessage("Base salary is required"),
    body("base_salary").isNumeric().withMessage("Base salary must be numeric"),
    body("benefits").isString().withMessage("benefits must be string"),
   ];

   public validateDates = (req: Request, res: Response, next: NextFunction) => {
    const { start_date, end_date } = req.body;
    if (new Date(end_date) <= new Date(start_date)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "End date must be after start date",
            path: "end_date",
            location: "body",
          },
        ],
      });
    }
    next();
  };

  //un middleware en el caso de campo unico
  public validateEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const{ id_employee } = req.body;
    const { status, message, data } = await EmployeeServices.getOne(id_employee);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `El id employee : ${id_employee}, no existe`,
                path: "id_employee",
                location: "body",
              },
            ],
          });
    }
    next();
  };
}
export { ContractValidator };