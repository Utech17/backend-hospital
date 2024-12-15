import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { AccountRecordServices } from "../services";

class AccountRecordValidator {
  public validateAccountRecord = [
    body("account_id").notEmpty().withMessage("Account ID is required"),
    body("account_id").isNumeric().withMessage("Account ID must be numeric"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("amount").isNumeric().withMessage("Amount must be numeric"),
    body("description").notEmpty().withMessage("Description is required"),
    body("description").isString().withMessage("Description must be string"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await AccountRecordServices.getOne(id);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `The id ${id} does not exist in the database.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
    next();
  };
}
export { AccountRecordValidator };