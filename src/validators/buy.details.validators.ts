import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ProductDB } from "../config";

class BuyDetailsValidator {
  public validateBuyDetails = [
    body("buy_details").isArray().withMessage("Los detalles de compra deben ser un array"),
    body("buy_details.*.product_id")
        .notEmpty().withMessage("El ID del producto es requerido")
        .isInt().withMessage("El ID del producto debe ser un número entero"),
    body("buy_details.*.quantity")
        .notEmpty().withMessage("La cantidad es requerida")
        .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0"),
    body("buy_details.*.buy_price")
        .notEmpty().withMessage("El precio de compra es requerido")
        .isFloat({ min: 0.01 }).withMessage("El precio de compra debe ser un número mayor a 0")
  ];

  public validateBuyDetailsExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { buy_details } = req.body;

      if (!buy_details || !Array.isArray(buy_details)) {
        return res.status(400).json({
          message: "Los detalles de compra son requeridos y deben ser un array",
          status: 400
        });
      }

      // Verificar que cada producto existe
      for (const detail of buy_details) {
        const product = await ProductDB.findByPk(detail.product_id);
        if (!product) {
          return res.status(404).json({
            message: `El producto con ID ${detail.product_id} no existe`,
            status: 404
          });
        }
      }

      // Verificar productos duplicados
      const productIds = buy_details.map(detail => detail.product_id);
      if (new Set(productIds).size !== productIds.length) {
        return res.status(400).json({
          message: "No se permiten productos duplicados en la compra",
          status: 400
        });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al validar los detalles de compra",
        status: 500
      });
    }
  };
}

export { BuyDetailsValidator };