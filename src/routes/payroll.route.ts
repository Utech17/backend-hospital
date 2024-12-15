import { Router } from "express";
import { validateFields } from "../middlewares";
import { PayrollController } from "../controllers";
import { PayrollValidator } from "../validators";

const router = Router();
const payrollValidator = new PayrollValidator();
const payrollController = new PayrollController();

router.get("/", payrollController.all);
router.get("/:id", payrollController.one);
router.post("/",payrollValidator.validatePayroll,payrollValidator.validateIfNameIsUsed,
  validateFields,payrollController.create);
router.put("/:id",payrollValidator.validatePayroll,payrollValidator.validateIfIdExists,
  payrollValidator.validateIfNameIsUsed,validateFields,payrollController.update);
router.delete("/:id", payrollController.delete);

export default router;