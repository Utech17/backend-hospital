import { Router } from "express";
import { validateFields } from "../middlewares";
import { SupplierValidator } from "../validators";
import { SupplierController } from "../controllers";

const router = Router();
const supplierController = new SupplierController();
const supplierValidator = new SupplierValidator();

router.get("/", supplierController.all);
router.get("/:id", supplierValidator.validateSupplierId, supplierController.one);
router.post("/", supplierValidator.validateSupplier, validateFields, supplierController.create);
router.put("/:id", supplierValidator.validateSupplierId, supplierValidator.validateSupplier, validateFields, supplierController.update);
router.delete("/:id", supplierValidator.validateSupplierId, supplierController.delete);

export default router;