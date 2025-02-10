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
    body("home_address")
      .notEmpty()
      .withMessage("Home address is required")
      .isString()
      .withMessage("Home address must be a string"),
    body("postal_code")
      .notEmpty()
      .withMessage("Postal code is required")
      .isString()
      .withMessage("Postal code must be a string"),
    body("organizational_unit_id")
      .notEmpty()
      .withMessage("Organizational unit ID is required")
      .isNumeric()
      .withMessage("Organizational unit ID must be numeric"),
    body("status")
      .isBoolean()
      .withMessage("Status must be a boolean"),
    body("user_id")
      .notEmpty()
      .withMessage("User ID is required")
      .isNumeric()
      .withMessage("User ID must be numeric")
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