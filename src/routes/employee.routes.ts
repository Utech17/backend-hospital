import { Router } from "express";
import { validateFields } from "../middlewares";
import { EmployeeController } from "../controllers";
import { EmployeeValidator } from "../validators";

const router = Router();
const employeeController = new EmployeeController();
const employeeValidator = new EmployeeValidator();

router.get("/", employeeController.all); // GET: http://localhost:3900/api/employee
router.get("/:id", employeeController.one); // GET: http://localhost:3900/api/employee/1
router.post("/", employeeValidator.validateEmployee, validateFields, employeeController.create); // POST: http://localhost:3900/api/employee
router.put("/:id", employeeValidator.validateEmployee, validateFields, employeeController.update); // PUT: http://localhost:3900/api/employee/2
router.delete("/:id", employeeController.delete); // DELETE: http://localhost:3900/api/employee/3

export default router;