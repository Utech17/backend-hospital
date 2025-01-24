import { Response, Request } from "express";
import { PaymentTypeService } from "../services";
import { PaymentTypeInterface } from "../interfaces";

export class PaymentTypeController {
  constructor() {}

  all = async (req: Request, res: Response) => {
    try {
      const { status, message, data } = await PaymentTypeService.getAll();
      return res.status(status).json({ message, data });
    } catch (error) {
      console.error("Error fetching payment types:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while fetching payment types.",
      });
    }
  };

  one = async (req: Request, res: Response) => {
    const { paymentTypeCode } = req.params;
    try {
      const { status, message, data } = await PaymentTypeService.getOne(paymentTypeCode);
      return res.status(status).json({ message, data });
    } catch (error) {
      console.error("Error fetching payment type:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while fetching the payment type.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    const payload: Partial<PaymentTypeInterface> = req.body;
    try {
      const { status, message, data } = await PaymentTypeService.create(payload);
      return res.status(status).json({ message, data });
    } catch (error) {
      console.error("Error creating payment type:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while creating the payment type.",
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const { paymentTypeCode } = req.params;
    const updates: Partial<PaymentTypeInterface> = req.body;
  
    if (!paymentTypeCode) {
      return res.status(400).json({
        message: "Payment type code is required.",
      });
    }
  
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No updates provided. Please send valid fields to update.",
      });
    }
  
    try {
      // Llamar al servicio para actualizar
      const { status, message, data } = await PaymentTypeService.update(updates, paymentTypeCode);
  
      return res.status(status).json({ message, data });
    } catch (error) {
      console.error("Error updating payment type:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while updating the payment type.",
      });
    }
  };  

  delete = async (req: Request, res: Response) => {
    const { paymentTypeCode } = req.params;
    try {
      const { status, message, data } = await PaymentTypeService.delete(paymentTypeCode);
      return res.status(status).json({ message, data });
    } catch (error) {
      console.error("Error deleting payment type:", error);
      return res.status(500).json({
        message: "An unexpected error occurred while deleting the payment type.",
      });
    }
  };
}