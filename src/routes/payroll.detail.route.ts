import { Router } from "express";
import { PayrollDetailController } from "../controllers";
import { PayrollDetailValidator } from "../validators";

const router = Router();
const controller = new PayrollDetailController();
const validator = new PayrollDetailValidator();

router.get("/", controller.all);
router.get("/:id", controller.one);
router.post(
  "/",
  validator.validatePayrollDetail,
  validator.validateEmployeeId,
  controller.create
);
router.put(
  "/:id",
  validator.validateAmountUpdate,
  controller.update
);
router.delete("/:id", controller.delete);

export default router;