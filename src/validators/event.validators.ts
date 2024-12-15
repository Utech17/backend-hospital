import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { eventServices } from "../services"

class EventValidator {
    public validateEvent = [
        body("results").notEmpty().withMessage("Results are required"),
        body("results").isString().withMessage("Results must be string"),
    ]

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { status, message, data } = await eventServices.getOne(id)

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
    }
}
export { EventValidator }
