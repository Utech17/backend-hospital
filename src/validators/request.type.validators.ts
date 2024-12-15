import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestTypeServices } from "../services";

class RequestTypeValidator {
  public validateRequestType = [
    body("name").notEmpty().withMessage("Request Type Name is required"),
    body("name").isString().withMessage("Request Type Name must be string"),
    body("description").notEmpty().withMessage("Request Type Description is required"),
    body("description").isString().withMessage("Request Type Description must be string"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await RequestTypeServices.getOne(id);
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
    const { status, message, data } = await RequestTypeServices.findByName(name);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 200) {
      const requestType = data?.requestType;
      if (id && id !== requestType.id) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Name "${name}" is already in use for another request type.`,
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
export { RequestTypeValidator };