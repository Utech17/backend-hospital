import { Router } from "express";
import { validateFields } from "../middlewares";
import { InventoryController } from "../controllers";
import { InventoryValidator } from "../validators";

const router = Router();
const InventoryController = new InventoryController();
const InventoryValidator = new InventoryValidator();

router.get("/", InventoryController.all); 
router.get("/:id", InventoryValidator.validateInventory, InventoryController.one); 
router.post(
  "/",
  InventoryValidator.validateInventory, 
  InventoryValidator.validateIfNameIsUse, 
  validateFields, 
  InventoryController.create 
);
router.put(
  "/:id",
  InventoryValidator.validateInventory,
  InventoryValidator.validateIfIdExist, 
  InventoryValidator.validateIfNameIsUse, 
  validateFields, 
  InventoryController.update 
);
router.delete("/:id", InventoryController.delete); 

export default router;