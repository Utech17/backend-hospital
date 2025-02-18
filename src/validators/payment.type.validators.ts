import type { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { PaymentTypeService } from "../services"

class PaymentTypeValidator {
  public validatePaymentType = [
    body("description")
      .notEmpty()
      .withMessage("Payment type description is required")
      .isString()
      .withMessage("Payment type description must be a string")
      .isLength({ max: 50 })
      .withMessage("Payment type description must not exceed 50 characters"),

    body("status").optional().isBoolean().withMessage("Status must be a boolean value (true or false)"),
  ]

  public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { status, message, data } = await PaymentTypeService.getOne(id)
    if (status == 500) {
      return res.status(status).json({
        message,
      })
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
      })
    }
    next()
  }

  public validateIfNameIsUse = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { description } = req.body
    const { status, message, data } = await PaymentTypeService.findByName(description)
    if (status == 500) {
      return res.status(status).json({
        message,
      })
    } else if (status == 200) {
      const paymentType: any = data?.paymentType
      if (id) {
        if (id != paymentType.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Name in use : ${description}, for the current record`,
                path: "description",
                location: "body",
              },
            ],
          })
        }
      } else {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Name in use : ${description}, for the new payment type name`,
              path: "description",
              location: "body",
            },
          ],
        })
      }
    }
    next()
  }

  public validatePaymentTypeCreate = [...this.validatePaymentType]
}

export { PaymentTypeValidator }