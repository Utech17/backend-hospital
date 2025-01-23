import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { BuyDetailsServices } from "../services";

class BuyDetailsValidator {
  public validateBuyDetails = [
    body("purchase_id").isInt().withMessage("purchase_id must be an integer"),
    body("product_id").isInt().withMessage("product_id must be an integer"),
    body("quantity").isInt().withMessage("quantity must be an integer"),
    body("purchase_price").isDecimal().withMessage("purchase_price must be a decimal"),
  ];

  public validateIfRecordExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { purchase_id, product_id } = req.params;

    // Check if both purchase_id and product_id are provided
    if (!purchase_id || !product_id) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "Both purchase_id and product_id are required for this operation.",
            path: "purchase_id, product_id",
            location: "params",
          },
        ],
      });
    }

    const { status, message, data } = await BuyDetailsServices.getByCompositeKey(
      Number(purchase_id),
      Number(product_id)
    );

    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The record with purchase_id: ${purchase_id} and product_id: ${product_id} does not exist.`,
            path: "purchase_id, product_id",
            location: "params",
          },
        ],
      });
    }

    next();
  };
}

export { BuyDetailsValidator };