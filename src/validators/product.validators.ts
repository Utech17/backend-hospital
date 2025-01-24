import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ProductServices } from "../services";

class ProductValidator {
  public validateProduct = [
    // Validación del campo name
    body("name")
      .notEmpty().withMessage("El nombre del producto es requerido")
      .isString().withMessage("El nombre del producto debe ser una cadena de texto")
      .isLength({ max: 100 }).withMessage("El nombre del producto no debe exceder los 100 caracteres"),

    // Validación del campo description
    body("description")
      .notEmpty().withMessage("La descripción es requerida")
      .isString().withMessage("La descripción debe ser una cadena de texto")
      .isLength({ max: 100 }).withMessage("La descripción no debe exceder los 100 caracteres"),

    // Validación del campo unit_measure
    body("unit_measure")
      .notEmpty().withMessage("La unidad de medida es requerida")
      .isString().withMessage("La unidad de medida debe ser una cadena de texto")
      .isLength({ max: 20 }).withMessage("La unidad de medida no debe exceder los 20 caracteres"),

    // Validación del campo quantity_xunit
    body("quantity_xunit")
      .notEmpty().withMessage("La cantidad por unidad es requerida")
      .isInt({ min: 1 }).withMessage("La cantidad por unidad debe ser un número entero positivo"),

    // Validación del campo weight
    body("weight")
      .notEmpty().withMessage("El peso es requerido")
      .isFloat({ min: 0.01 }).withMessage("El peso debe ser un número positivo con hasta 2 decimales"),

    // Validación del campo location
    body("location")
      .notEmpty().withMessage("La ubicación es requerida")
      .isString().withMessage("La ubicación debe ser una cadena de texto")
      .isLength({ max: 100 }).withMessage("La ubicación no debe exceder los 100 caracteres"),

    // Validación del campo status 
    body("status")
      .optional() // Si es opcional
      .isIn(["active", "inactive"]).withMessage("El estado debe ser 'active' o 'inactive'"),

    // Validaciones de claves foráneas
    body("type_id")
      .notEmpty().withMessage("El tipo es requerido")
      .isInt({ min: 1 }).withMessage("El tipo debe ser un número entero positivo"),

    body("class_id")
      .notEmpty().withMessage("La clase es requerida")
      .isInt({ min: 1 }).withMessage("La clase debe ser un número entero positivo"),

    body("pres_id")
      .notEmpty().withMessage("La presentación es requerida")
      .isInt({ min: 1 }).withMessage("La presentación debe ser un número entero positivo"),
  ];

  // Middleware para verificar si el ID del producto existe
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
  
    // Convertir el id de string a número
    const idNumber = parseInt(id, 10);
  
    // Verificar si la conversión fue exitosa
    if (isNaN(idNumber)) {
      return res.status(400).json({
        message: `El ID: ${id} no es válido. Debe ser un número.`,
      });
    }
  
    // Llamar a getOne con el id convertido a número
    const { status, message, data } = await ProductServices.getOne(idNumber);
  
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `El ID: ${idNumber} no existe en la base de datos.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
    
    next();
  };  

  // Middleware para verificar si el nombre está en uso
  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { name } = req.body;
    const { status, message, data } = await ProductServices.findByName(name);
    
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 200 && data) {
      const product: any = data?.product;
      if (!id || id != product.id) {
        return res.status(400).json({
          errors: [{ type: "field", msg: `El nombre '${name}' ya está en uso.`, path: "name", location: "body" }],
        });
      }
    }
    next();
  };
}

export { ProductValidator };