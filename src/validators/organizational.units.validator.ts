import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { OrganizationalUnitsService } from "../services"

class OrganizationalUnitsValidator {
    public validateorganizational_units = [
        body("results").notEmpty().withMessage("Results are required"),
        body("results").isString().withMessage("Results must be string"),
    ];

    verifyId = (req: Request, res: Response, next: NextFunction) => {
        next();
      };

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { status, message, data } = await OrganizationalUnitsService.getOne(id)

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
    let { _units_name } = req.body;
    const { status, message, data } = await OrganizationalUnitsService.findByName(_units_name);
    if (status == 500) {
      return res.status(status).json({
        message,
      });
    } else if (status == 200) {
      const organizational_units: any = data?.organizational_units;
      if (id) {
        if (id != organizational_units.id) {
          return res.status(400).json({
            errors: [
              {
                type: "field",
                msg: `Name in use : ${_units_name}, for the current record`,
                path: "_units_name",
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
              msg: `Name in use : ${_units_name}, for the new payment type name`,
              path: "_units_name",
              location: "body",
            },
          ],
        });
      }
    }
    next();
  };
}
export { OrganizationalUnitsValidator }