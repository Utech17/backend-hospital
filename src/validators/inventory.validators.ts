import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { InventoryService } from "../services"

class InventoryValidator {
  public validateInventory = [

    body("id_product")
      .notEmpty()
      .withMessage("Inventory id product is required")
      .isNumeric()
      .withMessage("Inventory id product must be a Number"),


    body("id_organizational_unit")
      .notEmpty()
      .withMessage("Inventory id location is required")
      .isString()
      .withMessage("Inventory id location must be a String"),

    body("amount")
      .notEmpty()
      .withMessage("Inventory amount is required")
      .isNumeric()
      .withMessage("Inventory amount must be a Number"),

    body("status")
      .notEmpty()
      .withMessage("Inventory status is required")
      .isNumeric()
      .withMessage("Inventory id product must be a Number"),

    body("batch")
      .notEmpty()
      .withMessage("Inventory batch is required")
      .isString()
      .withMessage("Inventory batch must be a String"),

    body("expiration_date")
      .notEmpty()
      .withMessage("Inventory expiration date is required")
      .isDate()
      .withMessage("Inventory expiration date must be a Date"),



  ];

  verifyId = (req: Request, res: Response, next: NextFunction) => {
    next();
  };

  public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { status, message, data } = await InventoryService.getOne(id)

    if (status == 500) {
      return res.status(status).json({
        message,
      })
    } else if (status == 404) {
      if (id) {
        return res.status(404).json({
          errors: [
            {
              type: "field",
              msg: `The parameter id : ${id}, does not exist in the database.`,
              path: "id",
              location: "param",
            },
          ],
        })
      }
    }
    next()
  };


}

export { InventoryValidator }