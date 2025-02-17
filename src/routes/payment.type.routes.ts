import { Router } from "express"
import { validateFields } from "../middlewares"
import { PaymentTypeController } from "../controllers"
import { PaymentTypeValidator } from "../validators"

const router = Router()
const paymentTypeController = new PaymentTypeController()
const paymentTypeValidator = new PaymentTypeValidator()

//http://localhost:3900/api/PaymentType
router.get("/", paymentTypeController.all)
//http://localhost:3900/api/PaymentType/1
router.get("/:id", paymentTypeValidator.validateIfIdExist, paymentTypeController.one)
//http://localhost:3900/api/PaymentType
router.post("/", paymentTypeValidator.validatePaymentTypeCreate, validateFields, paymentTypeController.create)
//http://localhost:3900/api/PaymentType/1
router.put(
  "/:id",
  paymentTypeValidator.validatePaymentType,
  paymentTypeValidator.validateIfIdExist,
  paymentTypeValidator.validateIfNameIsUse,
  validateFields,
  paymentTypeController.update,
)
//http://localhost:3900/api/PaymentType/1
router.delete("/:id", paymentTypeValidator.validateIfIdExist, paymentTypeController.delete)

export default router