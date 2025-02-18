import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { AccountServices } from "../services";

class AccountValidator {
  public validateAccount = [
    body("name")
        .notEmpty().withMessage("El nombre de la cuenta es requerido")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ max: 50 }).withMessage("El nombre debe tener menos de 50 caracteres"),
    body("balance")
        .notEmpty().withMessage("El balance es requerido")
        .isFloat().withMessage("El balance debe ser un número"),
    body("type_account")
        .notEmpty().withMessage("El tipo de cuenta es requerido")
        .isIn(['activo', 'pasivo', 'capital', 'ingreso', 'egreso'])
        .withMessage("Tipo de cuenta inválido"),
];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await AccountServices.getOne(Number(id));
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
      if (id && account && id !== (account as any).id) {
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