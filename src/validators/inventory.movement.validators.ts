import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { inventoryMovementServices,  StoreServices } from "../services";

class InventoryMovementValidator {
  public validateInventoryMovement = [
    body("id_store").notEmpty().withMessage("Warehouse ID is required"),
    body("id_store").isNumeric().withMessage("Warehouse ID must be numeric"),
    body("movement_date").notEmpty().withMessage("Movement date is required"),
    body("movement_date").isISO8601().withMessage("Movement date must be a valid date"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be an integer greater than or equal to 1"),
  ];

  public validateQuantityUpdate = [
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be an integer greater than or equal to 1"),
  ];

  // Middleware to validate store existence
  public validateStoreId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id_store } = req.body;
    const { status, message, data } = await StoreServices.getOne(id_store);
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The warehouse with ID: ${id_store} does not exist`,
            path: "id_store",
            location: "body",
          },
        ],
      });
    }
    next();
  };
}

export { InventoryMovementValidator };