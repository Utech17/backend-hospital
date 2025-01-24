import { Router } from "express";
import { validateFields } from "../middlewares";
import { InventoryController } from "../controllers";
import { InventoryValidator } from "../validators";

const router = Router();
const InventoryControllers = new InventoryController();
const InventoryValidators = new InventoryValidator();

router.get("/", InventoryControllers.all); 
router.get("/:id", InventoryValidators.validateInventory, InventoryControllers.one); 
router.post(
  "/",
  InventoryValidators.validateInventory, 
  validateFields, 
  InventoryControllers.create 
);
router.put(
  "/:id",
  InventoryValidators.validateInventory,
  InventoryValidators.validateIfIdExist,
  validateFields, 
  InventoryControllers.update 
);
router.delete("/:id", InventoryControllers.delete); 

export default router;