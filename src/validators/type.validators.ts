import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { typeServices } from "../services";

class TypeValidator {
  public validateType = [
    body("description_type")
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isNumeric()
      .withMessage("Status must be numeric"),
  ];

  // Middleware to validate if a type exists by its ID
  public validateTypeId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await typeServices.getOne(parseInt(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The type with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { TypeValidator };