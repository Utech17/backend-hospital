import { Router } from "express";
import { validateFields } from "../middlewares";
import { ChargeController } from "../controllers";
import { ChargeValidator } from "../validators";

const chargeValidator = new ChargeValidator();
const router = Router();
const chargeController = new ChargeController();

router.get("/", chargeController.all);
router.get("/:id", chargeController.one);
router.post(
  "/",
  chargeValidator.validatecharge,
  chargeValidator.validateIfchargeNameIsUse,
  validateFields,
  chargeController.create
);
router.put(
  "/:id",
  chargeValidator.validatecharge,
  chargeValidator.validateIfIdExist,
  chargeValidator.validateIfchargeNameIsUse,

  validateFields,
  chargeController.update
);
router.delete("/:id", chargeController.delete); 

export default router;