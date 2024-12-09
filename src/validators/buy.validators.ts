import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { BuyServices, ProductServices } from "../services";

class BuyValidator {
  public validateBuy = [
    body("buys_date")
      .notEmpty()
      .withMessage("Buys date is required")
      .isISO8601()
      .withMessage("Buys date must be a valid date"),
    body("total_amount")
      .notEmpty()
      .withMessage("Total amount is required")
      .isFloat({ gt: 0 })
      .withMessage("Total amount must be greater than 0"),
    body("products")
      .isArray({ min: 1 })
      .withMessage("At least one product must be provided"),
    body("products.*.product_id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isInt()
      .withMessage("Product ID must be an integer"),
    body("products.*.quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ];

  // Valida la existencia de los productos y su stock
  public validateIfProductsExist = async (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;

    for (const { product_id, quantity } of products) {
      const { status, message, data } = await ProductServices.getOne(product_id);

      if (status === 404) {
        return res.status(404).json({
          errors: [
            {
              msg: `Product with ID ${product_id} does not exist.`,
              param: "product_id",
              location: "body",
            },
          ],
        });
      }

      if (status !== 200) {
        return res.status(status).json({ message });
      }

      const productData: any = data?.product;
      if (quantity > productData.stock) {
        return res.status(400).json({
          errors: [
            {
              msg: `Insufficient stock for product ID ${product_id}. Available stock: ${productData.stock}.`,
              param: "quantity",
              location: "body",
            },
          ],
        });
      }
    }

    next();
  };

  // Valida la existencia de la compra
  public validateIfBuyExist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message } = await BuyServices.getOne(Number(id));

    if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            msg: `Buy with ID ${id} does not exist.`,
            param: "id",
            location: "params",
          },
        ],
      });
    }

    if (status !== 200) {
      return res.status(status).json({ message });
    }

    next();
  };

  // Verifica que no existan productos duplicados
  public validateUniqueProductInBuy = (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    const productIds = products.map((product: any) => product.product_id);

    if (new Set(productIds).size !== productIds.length) {
      return res.status(400).json({
        errors: [
          {
            msg: "Duplicate products found in the buy request.",
            param: "products",
            location: "body",
          },
        ],
      });
    }

    next();
  };
}

export { BuyValidator };