import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { eventTypeServices } from "../services";

class EventTypeValidator {
    public validateEventType = [
        body("event_name").notEmpty().withMessage("Event name eventTypes is required"),
        body("event_name").isString().withMessage("Event name eventTypes must be string"),
    ]

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { status, message, data } = await eventTypeServices.getOne(id);
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
        let { event_name } = req.body;
        const { status, message, data } = await eventTypeServices.findByName(event_name);
        if (status == 500) {
            return res.status(status).json({
                message,
            });
        } else if (status == 200) {
            const eventType: any = data?.eventType;
            if (id) {
                if (id != eventType.id) {
                    return res.status(400).json({
                        errors: [
                            {
                                type: "field",
                                msg: `Name in use : ${event_name}, for the current record`,
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
                            msg: `Name in use : ${event_name}, for the new event name`,
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
export { EventTypeValidator };