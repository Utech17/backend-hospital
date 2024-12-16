import { Router } from "express";
import { validateFields } from "../middlewares";
import { EventTypeController } from "../controllers";
import { EventTypeValidator } from "../validators";

const router = Router();
const eventTypeController = new EventTypeController();
const eventTypeValidator = new EventTypeValidator();

router.get("/", eventTypeController.all);

router.get("/:id", eventTypeController.one);

router.post(
    "/",
    eventTypeValidator.validateEventType,
    eventTypeValidator.validateIfNameIsUse,
    validateFields,
    eventTypeController.create
);

router.put(
    "/:id",
    eventTypeValidator.validateEventType,
    eventTypeValidator.validateIfIdExist,
    eventTypeValidator.validateIfNameIsUse,
    validateFields,
    eventTypeController.update
);

router.delete("/:id", eventTypeController.delete); 

export default router