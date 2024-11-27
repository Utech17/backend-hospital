import { Router } from "express";
import { validateFields } from "../middlewares";
import { ServiceController } from "../controllers";
import { ServiceValidator } from "../validators";
const router = Router();
const serviceValidator = new ServiceValidator();
const serviceController = new ServiceController();




router.get("/", serviceController.all);

router.get("/:id", serviceController.one);

router.post(
  "/",
  serviceValidator.validateService,
  serviceValidator.validateIfNameIsUse,
  validateFields,
  serviceController.create
);

router.put(
  "/:id",
  serviceValidator.validateService,
  serviceValidator.validateIfIdExist,
  serviceValidator.validateIfNameIsUse,
  validateFields,
  serviceController.update
);

router.delete("/:id", serviceController.delete); 
export default router;
