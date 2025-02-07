import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestTypeServices } from "../services";

class RequestTypeValidator {
  public validateRequestType = [
    body("name").notEmpty().withMessage("Request Type Name is required"),
    body("name").isString().withMessage("Request Type Name must be string"),
    body("bot").notEmpty().withMessage("Request Type bot is required"),
    body("bot").isBoolean().withMessage("Bot must be a boolean value"),
    body("department_id").notEmpty().withMessage("Request Type department_id is required"),
    body("department_id").isInt().withMessage("Department ID must be an integer"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await RequestTypeServices.getOne(Number(id));
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
      if (id && requestType && id !== (requestType as any).request_type_id) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `The name ${name} is already in use.`,
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