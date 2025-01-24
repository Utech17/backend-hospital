import { Router } from "express";
import { validateFields } from "../middlewares";
import { DepartmentController } from "../controllers";
import { DepartmentValidator } from "../validators";

const router = Router();
const departamentValidator = new DepartmentValidator();
const departamentController = new DepartmentController();

router.get("/", departamentController.all);
router.get("/:id", departamentController.one);
router.post("/",departamentValidator.validateDepartment,departamentValidator.validateIfNameIsUse,
  validateFields,departamentController.create);
router.put("/:id",departamentValidator.validateDepartment,departamentValidator.validateIfIdExist,
  departamentValidator.validateIfNameIsUse,validateFields,departamentController.update);
router.delete("/:id", departamentController.delete); 

export default router;