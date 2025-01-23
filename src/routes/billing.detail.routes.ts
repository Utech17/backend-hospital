import { Router } from "express";
import { BillingDetailValidator } from "../validators";
import { BillingDetailController } from "../controllers";

const router = Router();
const billingDetailController = new BillingDetailController();
const billingDetailValidator = new BillingDetailValidator();

router.get("/", billingDetailController.all);
router.get("/:id", billingDetailValidator.validateBillingDetailId, billingDetailController.one);
router.post("/", billingDetailValidator.validateBillingDetail, billingDetailController.create);
router.put("/:id", billingDetailValidator.validateBillingDetailId, billingDetailValidator.validateBillingDetail, billingDetailController.update);
router.delete("/:id", billingDetailValidator.validateBillingDetailId, billingDetailController.delete);

export default router;