import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestServices } from "../services";

class RequestValidator {
  public validateRequest = [
    body("name").notEmpty().withMessage("Request Name is required"),
    body("name").isString().withMessage("Request Name must be string"),
    body("status").notEmpty().withMessage("Request Status is required"),
    body("status").isBoolean().withMessage("Request Status must be boolean"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { status, message, data } = await RequestServices.getOne(id);
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
    const { status, message, data } = await RequestServices.findByName(name);
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 200) {
      const request = data?.request;
      if (id && id !== request.id) {
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: `Name "${name}" is already in use for another request.`,
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
export { RequestValidator };