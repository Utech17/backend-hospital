import { Router } from "express";
import { validateFields } from "../middlewares";
import { RoleController } from "../controllers";
import { RoleValidator } from "../validators";

const router = Router();
const roleController = new RoleController();
const roleValidator = new RoleValidator();

router.get("/", roleController.all); // http://localhost:3900/api/role
router.get("/:id", roleValidator.validateIfIdExist, roleController.one); // http://localhost:3900/api/role/1
router.post("/", roleValidator.validateRole, roleValidator.validateIfIdExist, validateFields, roleController.create); // http://localhost:3900/api/role
router.put("/:id", roleValidator.validateRole, roleValidator.validateIfIdExist, validateFields, roleController.update); // http://localhost:3900/api/role/1
router.delete("/:id", roleValidator.validateRole, roleValidator.validateIfIdExist, roleController.delete); // http://localhost:3900/api/role/1

export default router;