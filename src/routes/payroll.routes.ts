import { Router } from "express";
import { validateFields } from "../middlewares";
import { PayrollController } from "../controllers";
import { PayrollValidator } from "../validators";

const router = Router();
const payrollValidator = new PayrollValidator();
const payrollController = new PayrollController();

router.get("/", payrollController.all); // GET http://localhost:3900/api/payroll
router.get("/:id", payrollController.one); // GET http://localhost:3900/api/payroll/1
router.post("/",payrollValidator.validatePayroll,payrollValidator.validateCreate,
  validateFields,payrollController.create);// POST http://localhost:3900/api/payroll
router.put("/:id",payrollValidator.validatePayroll,payrollValidator.validateIfIdExists,
  validateFields,payrollController.update); // PUT http://localhost:3900/api/payroll/2
router.delete("/:id", payrollController.delete);

export default router;