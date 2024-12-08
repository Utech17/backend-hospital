import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { EmployeeServices } from "../services";

class EmployeeValidator {
  public validateEmployee = [
    body("phone_number")
      .notEmpty()
      .withMessage("Phone number is required")
      .isString()
      .withMessage("Phone number must be a string"),
    body("address")
      .notEmpty()
      .withMessage("Address is required")
      .isString()
      .withMessage("Address must be a string"),
    body("postal_code")
      .notEmpty()
      .withMessage("Postal code is required")
      .isString()
      .withMessage("Postal code must be a string"),
    body("unit_id")
      .notEmpty()
      .withMessage("Unit ID is required")
      .isNumeric()
      .withMessage("Unit ID must be numeric"),
    body("status")
      .isBoolean()
      .withMessage("Status must be a boolean"),
  ];

  // Middleware to validate employee existence
  public validateEmployeeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.body;
    const { status, message } = await EmployeeServices.getOne(id);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The employee with ID: ${id} does not exist`,
            path: "id",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { EmployeeValidator };