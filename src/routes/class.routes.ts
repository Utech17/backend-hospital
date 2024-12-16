import { Router } from "express";
import { validateFields } from "../middlewares";
import { ClassController } from "../controllers";
import { ClassValidator } from "../validators";

const router = Router();
const classValidator = new ClassValidator();
const classController = new ClassController();

router.get("/", classController.all);
router.get("/:id", classController.one);
router.post(
  "/",
  classValidator.validateClase,
  classValidator.validateIfNameIsUse,
  validateFields,
  classController.create
);
router.put(
  "/:id",
  classValidator.validateClase,
  classValidator.verifyId,
  classValidator.validateIfNameIsUse,
  validateFields,
  classController.update
);
router.delete("/:id", classValidator.verifyId, classController.delete);

export default router;
