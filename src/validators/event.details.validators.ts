import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { actionServices, eventServices } from "../services";

class EventDetailsValidator {
    public validateEventDetails = [
        body("id_actions").notEmpty().withMessage("Event id is required"),
        body("id_actions").isNumeric().withMessage("Event Id must be numeric"),
        body("id_events").notEmpty().withMessage("Action id is required"),
        body("id_events").isNumeric().withMessage("Action Id must be numeric"),
        body("value_detail").notEmpty().withMessage("Value detail is required"),
        body("value_detail").isNumeric().withMessage("Value detail must be numeric"),
    ]

    public validateIdEvents = async (req: Request, res: Response, next: NextFunction) => {
        const { id_events } = req.body;
        const { status, message, data } = await eventServices.getOne(id_events);
        if (status == 500) {
            return res.status(status).json({
                message,
            });
        } else if (status == 404) {

            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        msg: `The event id: ${id_events}, does not exist.`,
                        path: "id_actions",
                        location: "body",
                    },
                ],
            });
        }
        next();
    };

    public validateIdActions = async (req: Request, res: Response, next: NextFunction) => {
        const { id_actions } = req.body;
        const { status, message, data } = await actionServices.getOne(id_actions);
        if (status == 500) {
            return res.status(status).json({
                message,
            });
        } else if (status == 404) {

            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        msg: `The action id: ${id_actions}, does not exist.`,
                        path: "id_actions",
                        location: "body",
                    },
                ],
            });
        }
        next();
    };
}
export { EventDetailsValidator };