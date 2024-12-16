import { Router } from "express";
import { validateFields } from "../middlewares";
import { ActionController } from "../controllers";
import { ActionValidator } from "../validators";

const router = Router();
const actionController = new ActionController();
const actionValidator = new ActionValidator();

router.get("/", actionController.all);
router.get("/:id", actionController.one);
router.post(
    "/",
    actionValidator.validateAction,
    actionValidator.validateIfNameIsUse,
    validateFields,
    actionController.create
);
router.put(
    "/:id",
    actionValidator.validateAction,
    actionValidator.validateIfIdExist,
    actionValidator.validateIfNameIsUse,
    validateFields,
    actionController.update
);
router.delete("/:id", actionController.delete); 

export default router;