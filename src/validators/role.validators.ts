import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { RoleService } from "../services"

class RoleValidator {
    public validateRole = [
        body("name")
            .notEmpty()
            .withMessage("Role name is required")
            .isString()
            .withMessage("Role name must be a string"),
        body("description")
            .notEmpty()
            .withMessage("Role description is required")
            .isString()
            .withMessage("Role description must be a string"),
    ];

    verifyId = (req: Request, res: Response, next: NextFunction) => {
        next();
      };

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { status, message, data } = await RoleService.getOne(id)

        if (status == 500) {
            return res.status(status).json({
                message,
            })
        } else if (status == 404) {
            if (id) {
                return res.status(404).json({
                    errors: [
                        {
                            type: "field",
                            msg: `The parameter id : ${id}, does not exist in the database.`,
                            path: "id",
                            location: "param",
                        },
                    ],
                })
            }
        }
        next()
    };

  public validateIfNameIsUse = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { _role_name } = req.body;
    const { status, message, data } = await RoleService.findByName(_role_name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const Role: any = data?.Role;
      if (id) {
        if (id != Role.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Name in use : ${_role_name}, for the current record`,
                path: "_role_name",
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
              msg: `Name in use : ${_role_name}, for the new payment type name`,
              path: "_role_name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}

export { RoleValidator }