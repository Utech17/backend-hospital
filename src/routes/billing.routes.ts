import { Router } from "express";
import { validateFields } from "../middlewares";
import { BillingController } from "../controllers";
import { BillingValidator } from "../validators";

const router = Router();
const billingController = new BillingController();
const billingValidator = new BillingValidator();

router.get("/", billingController.all); // GET: http://localhost:3900/api/billing
router.get("/:id", billingController.one); // GET: http://localhost:3900/api/billing/1
router.post("/",billingValidator.validateBilling,validateFields,
  billingController.create); // POST: http://localhost:3900/api/billing
router.put("/:id",billingValidator.validateBilling,
  validateFields,billingController.update); // PUT: http://localhost:3900/api/billing/2
router.delete("/:id", billingController.delete); // DELETE: http://localhost:3900/api/billing/3

export default router;