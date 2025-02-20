import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PatientServices, clientServices, BillingServices } from "../services";

class BillingValidator {
  public validateBilling = [
    body("patient_id")
      .notEmpty()
      .withMessage("El ID del paciente es requerido")
      .isNumeric()
      .withMessage("El ID del paciente debe ser numérico"),
    body("client_id")
      .notEmpty()
      .withMessage("El ID del cliente es requerido")
      .isNumeric()
      .withMessage("El ID del cliente debe ser numérico"),
    body("billing_status")
      .optional()
      .isIn(["pendiente", "pagado", "cancelado"])
      .withMessage("El estado debe ser 'pendiente', 'pagado' o 'cancelado'"),
    body("BillingDetails")
      .isArray()
      .withMessage("Los detalles de facturación deben ser un array"),
    body("BillingDetails.*.quantity")
      .notEmpty()
      .withMessage("La cantidad es requerida")
      .isNumeric()
      .withMessage("La cantidad debe ser numérica")
      .isFloat({ min: 0.01 })
      .withMessage("La cantidad debe ser mayor a 0"),
    body("BillingDetails.*.price")
      .notEmpty()
      .withMessage("El precio es requerido")
      .isNumeric()
      .withMessage("El precio debe ser numérico")
      .isFloat({ min: 0.01 })
      .withMessage("El precio debe ser mayor a 0"),
    body("BillingDetails.*.product_id")
      .notEmpty()
      .withMessage("El ID del producto es requerido")
      .isNumeric()
      .withMessage("El ID del producto debe ser numérico"),
    body("payment_type_id")
      .notEmpty()
      .withMessage("El tipo de pago es requerido")
      .isNumeric()
      .withMessage("El tipo de pago debe ser numérico")
  ];

  // Middleware para validar existencia de factura
  public validateBillingId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.getOne(parseInt(id));
    
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `La factura con ID: ${id} no existe`,
            path: "id",
            location: "params",
          },
        ],
      });
    }
    next();
  };

  // Middleware para validar existencia de paciente
  public validatePatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { patient_id } = req.body;
    const { status, message } = await PatientServices.getOne(patient_id);
    
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `El paciente con ID: ${patient_id} no existe`,
            path: "patient_id",
            location: "body",
          },
        ],
      });
    }
    next();
  };

  // Middleware para validar existencia de cliente
  public validateClientId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { client_id } = req.body;
    const { status, message } = await clientServices.getOne(client_id);
    
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `El cliente con ID: ${client_id} no existe`,
            path: "client_id",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { BillingValidator };