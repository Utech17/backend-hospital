import { Router } from "express";
import { validateFields } from "../middlewares";
import { EventDetailsController } from "../controllers";
import { EventDetailsValidator } from "../validators";

const router = Router();
const eventDetailsController = new EventDetailsController();
const eventDetailsValidator = new EventDetailsValidator();

router.get("/", eventDetailsController.all);
router.get("/:id", eventDetailsController.one);
router.post(
    "/",
    eventDetailsValidator.validateEventDetails,
    eventDetailsValidator.validateIdActions,
    eventDetailsValidator.validateIdEvents,
    validateFields,
    eventDetailsController.create
);
router.put(
    "/:id",
    eventDetailsValidator.validateEventDetails,
    validateFields,
    eventDetailsController.update
);
router.delete("/:id", eventDetailsController.delete); 

export default router;