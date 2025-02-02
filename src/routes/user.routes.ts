import { Router } from "express";
import { validateFields } from "../middlewares";
import { UserController } from "../controllers";
import { UserValidator } from "../validators";

const router = Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.get("/", userController.all); // GET: http://localhost:3900/api/user
router.get("/:id", userValidator.validateUserId, userController.one); // GET: http://localhost:3900/api/user/:id
router.post("/",userValidator.validateUser,userValidator.validateUniqueEmail, userValidator.validateRoleId,validateFields,userController.create); // POST: http://localhost:3900/api/user
router.put("/:id",userValidator.validateUserId,userValidator.validateUser,validateFields,userController.update); // PUT: http://localhost:3900/api/user/:id
//router.patch("/:id/status",userValidator.validateUserId,userValidator.validateStatusUpdate,validateFields,userController.updateStatus); // PATCH: http://localhost:3900/api/user/:id/status
router.delete("/:id", userValidator.validateUserId, userController.delete); // DELETE: http://localhost:3900/api/user/:id
router.post("/login",userValidator.validateLogin,validateFields, userController.login);//http://localhost:3900/api/user

export default router;