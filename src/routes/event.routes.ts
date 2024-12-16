import { Router } from "express";

import { validateFields } from "../middlewares";
import { EventController } from "../controllers";
import { EventValidator } from "../validators";

const router = Router();
const eventValidator = new EventValidator();
const eventController = new EventController();

router.get("/", eventController.all);
router.get("/:id", eventController.one);
router.post(
    "/",
    eventValidator.validateEvent,
    validateFields,
    eventController.create
);
router.put(
    "/:id",
    eventValidator.validateEvent,
    eventValidator.validateIfIdExist,
    validateFields,
    eventController.update
);
router.delete("/:id", eventController.delete);

export default router;
