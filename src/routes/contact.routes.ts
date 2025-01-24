import { Router } from "express";
import { validateFields } from "../middlewares";
import { ContactController } from "../controllers";
import { ContactValidator } from "../validators";

const router = Router();
const contactValidator = new ContactValidator();
const contactController = new ContactController();

router.get("/", contactController.all);
router.get("/:id", contactController.one);
router.post(
    "/",
    contactValidator.validateContact,
    validateFields,
    contactController.create
);
router.put(
    "/:id",
    contactValidator.validateContact,
    contactValidator.validateIfIdExist,
    validateFields,
    contactController.update
);
router.delete("/:id", contactController.delete);

export default router;
