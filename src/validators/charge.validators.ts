import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ChargeServices } from "../services";

class ChargeValidator {
  public validatecharge = [
    body("charge_name").notEmpty().withMessage("Name is required"),
    body("charge_name").isString().withMessage("Name must be string"),
    body("description").notEmpty().withMessage("Description is required"),
    body("description").isString().withMessage("Description must be string"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const numericId = parseInt(id);
  
    if (isNaN(numericId)) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: `El parámetro id debe ser un número válido.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
  
    const { status, message, data } = await ChargeServices.getOne(numericId);
  
    if (status === 500) {
      return res.status(status).json({
        message,
      });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `El parámetro id: ${numericId} no existe en la base de datos.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
  
    next();
  };  

  public validateIfchargeNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { charge_name } = req.body;
    const { status, message, data } = await ChargeServices.findBychargeName(charge_name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const charge: any = data?.charge;
      if (id) {

        if (id != charge.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Nombre en uso : ${charge_name}, para el registro actual`,
                path: "charge_name",
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
              msg: `Nombre en uso : ${charge_name}, para el cargo actual`,
              path: "charge_name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { ChargeValidator };