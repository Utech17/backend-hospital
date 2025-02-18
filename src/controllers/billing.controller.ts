import { Request, Response } from "express";
import { BillingServices } from "../services";
import { BillingDetailInterface } from "../interfaces/billing.detail.interface";

export class BillingController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    const { status, message, data } = await BillingServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    try {
      const { 
        patient_id, 
        billing_date, 
        billing_status, 
        client_id, 
        BillingDetails, 
        payment_type_id 
      } = req.body;

      // Validar que todos los campos requeridos estén presentes
      if (!patient_id || !client_id) {
        return res.status(400).json({
          message: 'Los campos patient_id y client_id son obligatorios',
          status: 400
        });
      }

      // Validar BillingDetails
      if (!BillingDetails || !Array.isArray(BillingDetails) || BillingDetails.length === 0) {
        return res.status(400).json({
          message: 'Debe incluir al menos un producto en BillingDetails',
          status: 400
        });
      }

      // Validar cada detalle de la factura
      for (const detail of BillingDetails) {
        if (!detail.product_id || !detail.quantity || !detail.price) {
          return res.status(400).json({
            message: 'Cada detalle debe incluir product_id, quantity y price',
            status: 400
          });
        }
      }

      // Crear el objeto data con la estructura esperada
      const billingData = {
        patient_id: Number(patient_id),
        billing_date: billing_date || new Date(),
        billing_status: billing_status || 'pagado',
        client_id: Number(client_id)
      };

      // Convertir los valores numéricos en BillingDetails
      const formattedBillingDetails: BillingDetailInterface[] = BillingDetails.map(detail => ({
        product_id: Number(detail.product_id),
        quantity: Number(detail.quantity),
        price: Number(detail.price),
        updatedAt: new Date()
      }));

      const response = await BillingServices.create(
        billingData,
        formattedBillingDetails,
        Number(payment_type_id) || 1
      );

      return res.status(response.status).json(response);
    } catch (error) {
      console.error('Error en controlador:', error as Error);
      return res.status(500).json({
        message: 'Error en el servidor',
        error: (error as Error).message,
        status: 500
      });
    }
  };
  
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.update(
      parseInt(id) as number, 
      req.body
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await BillingServices.delete(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };
}