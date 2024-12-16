import { Router } from "express";
import { validateFields } from "../middlewares";
import { RoleController } from "../controllers";
import { RoleValidator } from "../validators";

const router = Router();
const roleController = new RoleController();
const roleValidator = new RoleValidator();

router.get("/", roleController.all); 
router.get("/:id", roleValidator.validateRole, roleController.one); 
router.post(
  "/",
  roleValidator.validateRole, 
  roleValidator.validateIfNameIsUse, 
  validateFields, 
  roleController.create 
);
router.put(
  "/:id",
  roleValidator.validateRole,
  roleValidator.validateIfIdExist, 
  roleValidator.validateIfNameIsUse, 
  validateFields, 
  roleController.update 
);
router.delete("/:id", roleController.delete); 

export default router;