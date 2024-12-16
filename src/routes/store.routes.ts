import { Router } from "express";
import { validateFields } from "../middlewares";
import { StoreController } from "../controllers";
import { StoreValidator } from "../validators";

const router = Router();
const storeValidator = new StoreValidator();
const storeController = new StoreController();

router.get("/", storeController.all);
router.get("/:id", storeController.one);
router.post(
  "/",
  storeValidator.validateStore,
  storeValidator.validateIfNameIsUse,
  validateFields,
  storeController.create
);
router.put(
  "/:id",
  storeValidator.validateStore,
  storeValidator.validateIfIdExist,
  storeValidator.validateIfNameIsUse,
  validateFields,
  storeController.update
);
router.delete("/:id", storeController.delete); 

export default router;
