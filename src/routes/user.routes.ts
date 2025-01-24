import { Router } from "express";
import { validateFields } from "../middlewares";
import { UserController } from "../controllers";
import { UserValidator } from "../validators";

const router = Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.get("/", userController.all); // GET: http://localhost:3800/api/users
router.get("/:id", userValidator.validateUserId, userController.one); // GET: http://localhost:3800/api/users/:id
router.post("/",userValidator.validateUser,userValidator.validateUniqueEmail,
  validateFields,userController.create); // POST: http://localhost:3800/api/users
router.put("/:id",userValidator.validateUserId,userValidator.validateUser,
  validateFields,userController.update); // PUT: http://localhost:3800/api/users/:id
router.patch("/:id/status",userValidator.validateUserId,userValidator.validateStatusUpdate,
  validateFields,userController.updateStatus); // PATCH: http://localhost:3800/api/users/:id/status
router.delete("/:id", userValidator.validateUserId, userController.delete); // DELETE: http://localhost:3800/api/users/:id

export default router;