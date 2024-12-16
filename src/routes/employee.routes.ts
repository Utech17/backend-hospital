import { Router } from "express";
import { validateFields } from "../middlewares";
import { EmployeeController } from "../controllers";
import { EmployeeValidator } from "../validators";

const router = Router();
const employeeController = new EmployeeController();
const employeeValidator = new EmployeeValidator();

router.get("/", employeeController.all); // GET: http://localhost:3800/api/employees
router.get("/:id", employeeController.one); // GET: http://localhost:3800/api/employees/:id
router.post("/", employeeValidator.validateEmployee, validateFields, employeeController.create); // POST: http://localhost:3800/api/employees
router.put("/:id", employeeValidator.validateEmployee, validateFields, employeeController.update); // PUT: http://localhost:3800/api/employees/:id
router.delete("/:id", employeeController.delete); // DELETE: http://localhost:3800/api/employees/:id

export default router;