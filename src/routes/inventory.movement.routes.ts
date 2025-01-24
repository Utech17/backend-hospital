import { Router } from "express";
import { validateFields } from "../middlewares";
import { InventoryMovementController } from "../controllers";
import { InventoryMovementValidator } from "../validators";

const router = Router();
const inventoryMovementController = new InventoryMovementController();
const inventoryMovementValidator = new InventoryMovementValidator();

router.get("/", inventoryMovementController.all); // GET: http://localhost:3800/api/inventory-movements
router.get("/:id", inventoryMovementController.one); // GET: http://localhost:3800/api/inventory-movements/:id
router.post("/",inventoryMovementValidator.validateInventoryMovement,inventoryMovementValidator.validateStoreId,validateFields,
  inventoryMovementController.create
); // POST: http://localhost:3800/api/inventory-movements
router.put("/:id",inventoryMovementValidator.validateInventoryMovement,validateFields,inventoryMovementController.update
); // PUT: http://localhost:3800/api/inventory-movements/:id
router.delete("/:id", inventoryMovementController.delete); // DELETE: http://localhost:3800/api/inventory-movements/:id

export default router;