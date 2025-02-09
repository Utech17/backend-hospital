import { Router } from "express";
import { validateFields } from "../middlewares";
import { StoreController } from "../controllers";
import { StoreValidator } from "../validators";

const router = Router();
const storeValidator = new StoreValidator();
const storeController = new StoreController();

router.get("/", storeController.all); // GET: http://localhost:3900/api/store
router.get("/:id", storeController.one); // GET: http://localhost:3900/api/store/:id
router.post(
  "/",
  storeValidator.validateStore,
  storeValidator.validateIfNameIsUse,
  validateFields,
  storeController.create
);// POST: http://localhost:3900/api/store
router.put(
  "/:id",
  storeValidator.validateStore,
  storeValidator.validateIfIdExist,
  storeValidator.validateIfNameIsUse,
  validateFields,
  storeController.update
); // PUT: http://localhost:3900/api/store/:id
router.delete("/:id", storeController.delete); // DELETE: http://localhost:3900/api/store/:id

export default router;
