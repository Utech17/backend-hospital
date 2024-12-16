import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { supplierServices } from "../services";

class SupplierValidator {
  public validateSupplier = [
    body("name").notEmpty().withMessage("Supplier name is required"),
    body("name").isLength({ max: 255 }).withMessage("Supplier name cannot exceed 255 characters"),
    body("email").optional().isEmail().withMessage("Email must be a valid email address"),
    body("phone")
      .optional()
      .matches(/^[0-9]+$/)
      .withMessage("Phone number must contain only digits"),
    body("address").optional().isLength({ max: 255 }).withMessage("Address cannot exceed 255 characters"),
  ];

  // Middleware to validate supplier existence by ID
  public validateSupplierId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await supplierServices.getOne(parseInt(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The supplier with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { SupplierValidator };