import { Router } from "express";
import { validateFields } from "../middlewares";
import { DepartamentController } from "../controllers";
import { DepartamentValidator } from "../validators";

const router = Router();
const departamentValidator = new DepartamentValidator();
const departamentController = new DepartamentController();

router.get("/", departamentController.all);
router.get("/:id", departamentController.one);
router.post("/",departamentValidator.validateDepartament,departamentValidator.validateIfNameIsUse,
  validateFields,departamentController.create);
router.put("/:id",departamentValidator.validateDepartament,departamentValidator.validateIfIdExist,
  departamentValidator.validateIfNameIsUse,validateFields,departamentController.update);
router.delete("/:id", departamentController.delete); 

export default router;