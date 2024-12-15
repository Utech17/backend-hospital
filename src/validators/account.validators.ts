import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { AccountServices } from "../services";

class AccountValidator {
  public validateAccount = [
    body("name").notEmpty().withMessage("Account Name is required"),
    body("name").isString().withMessage("Account Name must be string"),
    body("balance").notEmpty().withMessage("Account Balance is required"),
    body("balance").isNumeric().withMessage("Account Balance must be numeric"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await AccountServices.getOne(id);
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

  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { name } = req.body;
    const { status, message, data } = await AccountServices.findByName(name);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 200) {
      const account = data?.account;
      if (id && id !== account.id) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Name "${name}" is already in use for another account.`,
              path: "name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { AccountValidator };