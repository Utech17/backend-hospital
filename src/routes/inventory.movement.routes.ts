import { Router } from "express";
import { validateFields } from "../middlewares";
import { InventoryMovementController } from "../controllers";
import { InventoryMovementValidator } from "../validators";

const router = Router();
const inventoryMovementController = new InventoryMovementController();
const inventoryMovementValidator = new InventoryMovementValidator();

router.get("/", inventoryMovementController.all); // GET: http://localhost:3900/api/inventory-movement
router.get("/:id", inventoryMovementController.one); // GET: http://localhost:3900/api/inventory-movement/1
router.post("/",inventoryMovementValidator.validateInventoryMovement,inventoryMovementValidator.validateStoreId,validateFields,
  inventoryMovementController.create
); // POST: http://localhost:3900/api/inventory-movement
router.put("/:id",inventoryMovementValidator.validateInventoryMovement,validateFields,inventoryMovementController.update
); // PUT: http://localhost:3900/api/inventory-movement/2
router.delete("/:id", inventoryMovementController.delete); // DELETE: http://localhost:3900/api/inventory-movement/3

export default router;