import { Router } from "express";
import { validateFields } from "../middlewares";
import { TypeController } from "../controllers";
import { TypeValidator } from "../validators";

const typeValidator = new TypeValidator();
const typeController = new TypeController();
const router = Router();

router.get("/", typeController.all); // http://localhost:3800/api/types
router.get("/:id", typeValidator.validateTypeId, validateFields, typeController.one); // http://localhost:3800/api/types/1
router.post("/", typeValidator.validateType, validateFields, typeController.create); // http://localhost:3800/api/types
router.put("/:id", typeValidator.validateTypeId, typeValidator.validateType, validateFields, typeController.update); // http://localhost:3800/api/types/1
router.delete("/:id", typeValidator.validateTypeId, typeController.delete); // http://localhost:3800/api/types/1

export default router;