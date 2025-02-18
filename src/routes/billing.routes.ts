import { Router } from "express";
import { validateFields } from "../middlewares";
import { BillingController } from "../controllers";
import { BillingValidator } from "../validators";

const router = Router();
const billingController = new BillingController();
const billingValidator = new BillingValidator();

router.get("/", billingController.all);
router.get("/:id", billingValidator.validateBillingId, billingController.one);
router.post("/",
  billingValidator.validateBilling,
  billingValidator.validatePatientId,
  billingValidator.validateClientId,
  validateFields,
  billingController.create
);
router.put("/:id",
  billingValidator.validateBillingId,
  billingValidator.validateBilling,
  billingValidator.validatePatientId,
  billingValidator.validateClientId,
  validateFields,
  billingController.update
);
router.delete("/:id", 
  billingValidator.validateBillingId,
  billingController.delete
);

export default router;