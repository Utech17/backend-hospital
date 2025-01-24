import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PresentationServices } from "../services";

class PresentationValidator {
  public validatePresentation = [
    body("cantidad")
      .notEmpty()
      .withMessage("Quantity is required"),
    body("cantidad")
      .isLength({ max: 20 })
      .withMessage("Quantity must not exceed 20 characters"),
    body("medida")
      .notEmpty()
      .withMessage("Measurement unit is required"),
    body("medida")
      .isLength({ max: 20 })
      .withMessage("Measurement unit must not exceed 20 characters"),
    body("peso")
      .notEmpty()
      .withMessage("Weight is required"),
    body("peso")
      .isFloat({ min: 0 })
      .withMessage("Weight must be a positive decimal number"),
    body("status")
      .notEmpty()
      .withMessage("Status is required"),
    body("status")
      .isInt({ min: 0, max: 1 })
      .withMessage("Status must be either 0 or 1"),
  ];

  // Middleware to validate presentation existence
  public validatePresentationId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cod_pres } = req.body;
    const { status, message, data } = await PresentationServices.getOne(cod_pres);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The presentation with ID: ${cod_pres} does not exist`,
            path: "cod_pres",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { PresentationValidator };