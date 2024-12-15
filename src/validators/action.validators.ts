import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { actionServices } from "../services";

class ActionValidator {
    public validateAction = [
        body("name_actions").notEmpty().withMessage("Name actions is required"),
        body("name_actions").isString().withMessage("Name actions must be string"),
        body("description").notEmpty().withMessage("Description is required"),
        body("description").isString().withMessage("Description must be string"),
    ]

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { status, message, data } = await actionServices.getOne(id);
        if (status == 500) {
            return res.status(status).json({
                message,
            });
        } else if (status == 404) {

            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        msg: `The parameter id : ${id}, does not exist in the database.`,
                        path: "id",
                        location: "body",
                    },
                ],
            });
        }
        next();
    };

    public validateIfNameIsUse = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        let { name_actions } = req.body;
        const { status, message, data } = await actionServices.findByName(name_actions);
        if (status == 500) {
            return res.status(status).json({
                message,
            });
        } else if (status == 200) {
            const action: any = data?.action;
            if (id) {
                if (id != action.id) {
                    return res.status(400).json({
                        errors: [
                            {
                                type: "field",
                                msg: `Name in use : ${name_actions}, for the current record`,
                                path: "name",
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
                            msg: `Name in use : ${name_actions}, for the new action`,
                            path: "name",
                            location: "body",
                        },
                    ],
                });
            }
        }
        next();
    }
}
export { ActionValidator };