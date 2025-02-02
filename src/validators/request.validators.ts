import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { RequestServices } from "../services";

class RequestValidator {
  public validateRequest = [
    body("request_id").optional().isInt().withMessage("Request ID must be an integer"),
    body("description").notEmpty().withMessage("Description is required"),
    body("description").isString().withMessage("Description must be a string"),
    body("request_type_id").notEmpty().withMessage("Request Type ID is required"),
    body("request_type_id").isInt().withMessage("Request Type ID must be an integer"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("amount").isDecimal().withMessage("Amount must be a decimal value"),
    body("status").notEmpty().withMessage("Request Status is required"),
    body("status").isIn(['pending', 'approved', 'rejected']).withMessage("Request Status must be one of 'pending', 'approved', 'rejected'"),
  ];

  public validateIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { request_id } = req.params;
    const { status, message, data } = await RequestServices.getOne(Number(request_id));
    if (status === 500) {
      return res.status(status).json({ message });
    } else if (status === 404) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            msg: `The id ${request_id} does not exist in the database.`,
            path: "id",
            location: "param",
          },
        ],
      });
    }
    next();
  };
}
export { RequestValidator };