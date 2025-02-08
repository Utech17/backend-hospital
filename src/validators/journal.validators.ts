import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { JournalServices } from "../services";

class JournalValidator {
  public validateJournal = [
    body("request_id").notEmpty().withMessage("Request ID is required"),
    body("request_id").isNumeric().withMessage("Request ID must be numeric"),
    body("account_record_id").notEmpty().withMessage("Account Record ID is required"),
    body("account_record_id").isNumeric().withMessage("Account Record ID must be numeric"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await JournalServices.getOne(Number(id));
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