import { Router } from "express";
import { validateFields } from "../middlewares";
import { PurchaseDetailsController } from "../controllers"; 
import { PurchaseDetailsValidator } from "../validators";

const router = Router();
const purchaseDetailsController = new PurchaseDetailsController();
const purchaseDetailsValidator = new PurchaseDetailsValidator();

router.get("/", purchaseDetailsController.all);
router.get("/:id_compra/:id_producto", purchaseDetailsController.one);
router.post(
  "/",
  purchaseDetailsValidator.validatePurchaseDetails,
  validateFields,
  purchaseDetailsController.create
);
router.put(
  "/:id_compra/:id_producto",
  purchaseDetailsValidator.validatePurchaseDetails,
  validateFields,
  purchaseDetailsController.update
);
router.delete("/:id_compra/:id_producto", purchaseDetailsController.delete);

export default router;