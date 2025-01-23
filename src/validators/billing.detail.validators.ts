import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { BillingDetailServices } from "../services";

class BillingDetailValidator {
  public validateBillingDetail = [
    body("Billing_id").notEmpty().withMessage("Billing ID is required"),
    body("Billing_id").isNumeric().withMessage("Billing ID must be numeric"),
    body("product_id").notEmpty().withMessage("Product ID is required"),
    body("product_id").isNumeric().withMessage("Product ID must be numeric"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be an integer greater than or equal to 1"),
    body("price").notEmpty().withMessage("Price is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ];

  // Middleware to validate Billing detail existence by ID
  public validateBillingDetailId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await BillingDetailServices.getOne(parseInt(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The Billing detail with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { BillingDetailValidator };