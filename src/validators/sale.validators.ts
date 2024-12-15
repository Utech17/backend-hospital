import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { SaleServices, ProductServices, UserServices, clientServices } from "../services";

class SaleValidator {
  public validateSale = [
    body("sale_date").notEmpty().withMessage("Sale date is required"),
    body("sale_date").isDate().withMessage("Sale date must be a valid date"),
    body("total_amount").notEmpty().withMessage("Total amount is required"),
    body("total_amount").isFloat({ gt: 0 }).withMessage("Total amount must be greater than 0"),
  ];

  public validateIfProductsExist = async (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "At least one product must be provided.",
            path: "products",
            location: "body",
          },
        ],
      });
    }

    for (const product of products) {
      const { product_id, quantity } = product;
      const { status, message, data } = await ProductServices.getOne(product_id);

      if (status == 500) {
        return res.status(status).json({ message });
      } else if (status == 404) {
        return res.status(404).json({
          errors: [
            {
              type: "field",
              msg: `Product with ID ${product_id} does not exist in the database.`,
              path: "product_id",
              location: "body",
            },
          ],
        });
      }

      const productData: any = data?.product;
      if (quantity > productData.stock) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Insufficient stock for product ID ${product_id}. Available stock: ${productData.stock}.`,
              path: "quantity",
              location: "body",
            },
          ],
        });
      }
    }

    next();
  };

  public validateIfSaleExist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await SaleServices.getOne(Number(id));
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `Sale with ID ${id} does not exist in the database.`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };

  public validateUniqueProductInSale = (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    const productIds = products.map((product: any) => product.product_id);

    const uniqueProductIds = new Set(productIds);
    if (uniqueProductIds.size !== productIds.length) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "Duplicate products found in the sale.",
            path: "products",
            location: "body",
          },
        ],
      });
    }

    next();
  };

  public validatePaymentType = [
    body("payment_type").notEmpty().withMessage("El tipo de pago es obligatorio."),
    body("payment_type")
      .isIn(["cash", "credit", "debit"])
      .withMessage("El tipo de pago debe ser 'cash', 'credit' o 'debit'."),
  ];
}

export { SaleValidator };