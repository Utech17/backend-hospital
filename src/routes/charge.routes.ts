import { Router } from "express";
import { validateFields } from "../middlewares";
import { ChargeController } from "../controllers";
import { ChargeValidator } from "../validators";

const chargeValidator = new ChargeValidator();
const router = Router();
const chargeController = new ChargeController();

router.get("/", chargeController.all); // http://localhost:3900/api/charge
router.get("/:id", chargeController.one); // http://localhost:3900/api/charge/1
router.post(
  "/",
  chargeValidator.validatecharge,
  chargeValidator.validateIfchargeNameIsUse,
  validateFields,
  chargeController.create
); // http://localhost:3900/api/charge
router.put(
  "/:id",
  chargeValidator.validatecharge,
  chargeValidator.validateIfIdExist,
  chargeValidator.validateIfchargeNameIsUse,

  validateFields,
  chargeController.update
); // http://localhost:3900/api/charge/1
router.delete("/:id", chargeController.delete); // http://localhost:3900/api/charge/1

export default router;