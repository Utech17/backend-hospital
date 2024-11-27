import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { serviceServices } from "../services";

class ServiceValidator {
  public validateService = [
    body("name").notEmpty().withMessage("Service Name is required"),
    body("name").isString().withMessage("Service Name must be string"),
    body("price").notEmpty().withMessage("Service Price is required"),
    body("price").isNumeric().withMessage("Service Price must be numeric"),
  ];

  //un middleware en el caso de campo id
  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await serviceServices.getOne(id);
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
    const { status, message, data } = await serviceServices.findByName(name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const service: any = data?.service;
      if (id) {
        //caso si es para actualizar datos
        if (id != service.id) {
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
export { ServiceValidator };
