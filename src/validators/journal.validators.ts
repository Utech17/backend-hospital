import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { JournalServices } from "../services";

class JournalValidator {
  public validateJournal = [
    body("account_id").notEmpty().withMessage("Account ID is required"),
    body("account_id").isNumeric().withMessage("Account ID must be numeric"),
    body("debit").notEmpty().withMessage("Debit amount is required"),
    body("debit").isNumeric().withMessage("Debit must be numeric"),
    body("credit").notEmpty().withMessage("Credit amount is required"),
    body("credit").isNumeric().withMessage("Credit must be numeric"),
    body("transaction_date").notEmpty().withMessage("Transaction Date is required"),
    body("transaction_date").isDate().withMessage("Transaction Date must be a valid date"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await JournalServices.getOne(id);
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
export { JournalValidator };