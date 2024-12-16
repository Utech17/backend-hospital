import { Router } from "express";
import { validateFields } from "../middlewares";
import { PaymentTypeController } from "../controllers";
import { PaymentTypeValidator } from "../validators";

const router = Router();
const paymentTypeController = new PaymentTypeController();
const paymentTypeValidator = new PaymentTypeValidator();

router.get("/", paymentTypeController.all);
router.get("/:id", paymentTypeValidator.validatePaymentType, paymentTypeController.one); 
router.post(
  "/",
  paymentTypeValidator.validatePaymentType,
  paymentTypeValidator.validateIfNameIsUse,
  validateFields,
  paymentTypeController.create
);
router.put(
  "/:id",
  paymentTypeValidator.validatePaymentType,
  paymentTypeValidator.validatePaymentType,
  paymentTypeValidator.validateIfNameIsUse, 
  validateFields, 
  paymentTypeController.update 
);
router.delete("/:id", paymentTypeValidator.validatePaymentType, paymentTypeController.delete); 

export default router;