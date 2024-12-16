import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { StoreServices } from "../services";

class StoreValidator {
  public validateStore = [
    body("name").notEmpty().withMessage("Store Name is required"),
    body("name").isString().withMessage("Store Name must be string"),
    body("location").notEmpty().withMessage("Store location is required"),
    body("location").isString().withMessage("Store location must be string"),
    body("description").notEmpty().withMessage("Store description is required"),
    body("description").isString().withMessage("Store description must be string"),
  ];

  verifyId = (req: Request, res: Response, next: NextFunction) => {
    next();
  };
  //un middleware en el caso de campo unico
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await StoreServices.getOne(id);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 404) {
      if (id) {
        return res.status(404).json({
          errors: [
            {
              type: "field",
              msg: `El parametro id : ${id}, no existe en la base de datos.`,
              path: "id",
              location: "param",
            },
          ],
        });
      }
    }
    next();
  };
  //un middleware en el caso de campo unico
  public validateIfNameIsUse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    let { name } = req.body;
    const { status, message, data } = await StoreServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const store: any = data?.store;
      if (id) {
        //caso si es para actualizar datos
        if (id != store.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Nombre en uso : ${name}, para el registro actual`,
                path: "name",
                location: "body",
              },
            ],
          });
        }
      } else {
        //caso si es para registrar un nuevo rol
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Nombre en uso : ${name}, para el nuevo rol`,
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
export { StoreValidator };