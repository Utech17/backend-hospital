import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { invoiceDetailServices } from "../services";

class InvoiceDetailValidator {
  public validateInvoiceDetail = [
    body("invoice_id").notEmpty().withMessage("Invoice ID is required"),
    body("invoice_id").isNumeric().withMessage("Invoice ID must be numeric"),
    body("product_id").notEmpty().withMessage("Product ID is required"),
    body("product_id").isNumeric().withMessage("Product ID must be numeric"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be an integer greater than or equal to 1"),
    body("price").notEmpty().withMessage("Price is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  ];

  // Middleware to validate invoice detail existence by ID
  public validateInvoiceDetailId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await invoiceDetailServices.getOne(parseInt(id));
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The invoice detail with ID: ${id} does not exist`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };
}

export { InvoiceDetailValidator };