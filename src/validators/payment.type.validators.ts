import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { PaymentTypeService } from "../services";

class PaymentTypeValidator {
  public validatePaymentType = [
    body("payment_type_code")
      .notEmpty()
      .withMessage("Payment type code is required")
      .isString()
      .withMessage("Payment type code must be a string")
      .isLength({ min: 3, max: 10 })
      .withMessage("Payment type code must be between 3 and 10 characters"),
  
    body("payment_type_description")
      .notEmpty()
      .withMessage("Payment type description is required")
      .isString()
      .withMessage("Payment type description must be a string")
      .isLength({ max: 255 })
      .withMessage("Payment type description must not exceed 255 characters"),
  
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isBoolean()
      .withMessage("Status must be a boolean value (true or false)")
  ];

  public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await PaymentTypeService.getOne(id);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `The parameter id : ${id}, does not exist in the database.`,
            path: "id",
            location: "body",
          },
        ],
      });
    }
    next();
  };

  public validateIfNameIsUse = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { payment_type_name } = req.body;
    const { status, message, data } = await PaymentTypeService.findByName(payment_type_name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const paymentType: any = data?.paymentType;
      if (id) {
        if (id != paymentType.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Name in use : ${payment_type_name}, for the current record`,
                path: "payment_type_name",
                location: "body",
              },
            ],
          });
        }
      } else {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Name in use : ${payment_type_name}, for the new payment type name`,
              path: "payment_type_name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}

export { PaymentTypeValidator };