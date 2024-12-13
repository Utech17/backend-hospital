import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { WorkingDayServices } from "../services";

class WorkingDayValidator {
  // Validaciones para los campos de WorkingDay
  public validateWorkingDay = [
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string"),
    body("weekly_hours")
      .notEmpty()
      .withMessage("Weekly hours are required")
      .isNumeric()
      .withMessage("Weekly hours must be numeric"),
  ];

  public validateWorkingDayId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await WorkingDayServices.getOne(parseInt(id));
    
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The working day with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { WorkingDayValidator };