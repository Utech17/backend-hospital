import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { contactServices } from "../services"

class ContactValidator {
    public validateContact = [
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("lastName").isString().withMessage("Last name must be string"),
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Email must be email"),
        body("phone").notEmpty().withMessage("Phone is required"),
        body("phone").isString().withMessage("Phone must be string"),
    ]

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { status, message, data } = await contactServices.getOne(id)

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
export { ContactValidator }
