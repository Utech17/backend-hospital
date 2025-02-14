import { body } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { supplierServices } from "../services";

class SupplierValidator {
  public validateSupplier = [
    body("rif").notEmpty().withMessage("El RIF es obligatorio"),
    body("rif").isLength({ max: 15 }).withMessage("El RIF no puede exceder los 15 caracteres"),
    body("address").notEmpty().withMessage("La dirección es obligatoria"),
    body("address").isLength({ max: 255 }).withMessage("La dirección no puede exceder los 255 caracteres"),
    body("business_name").notEmpty().withMessage("El nombre comercial es obligatorio"),
    body("business_name").isLength({ max: 100 }).withMessage("El nombre comercial no puede exceder los 100 caracteres"),
    body("status").optional().isBoolean().withMessage("El estado debe ser un valor booleano"),
  ];

  // Middleware para validar la existencia del proveedor por ID
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
            msg: `El proveedor con ID: ${id} no existe`,
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