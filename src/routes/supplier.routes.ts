import { Router } from "express";
import { SupplierValidator } from "../validators";
import { SupplierController } from "../controllers";

const router = Router();
const supplierController = new SupplierController();
const supplierValidator = new SupplierValidator();

router.get("/", supplierController.all);
router.get("/:id", supplierValidator.validateSupplierId, supplierController.one);
router.post("/", supplierValidator.validateSupplier, supplierController.create);
router.put("/:id", supplierValidator.validateSupplierId, supplierValidator.validateSupplier, supplierController.update);
router.delete("/:id", supplierValidator.validateSupplierId, supplierController.delete);

export default router;