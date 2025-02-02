import { Router } from "express";
import { validateFields } from "../middlewares";
import { AccountController } from "../controllers";
import { AccountValidator } from "../validators";

const accountValidator = new AccountValidator();
const router = Router();
const accountController = new AccountController();

router.get("/", accountController.all); // http://localhost:3900/api/account
router.get("/:id", accountController.one); // http://localhost:3900/api/account/1
router.post("/", accountValidator.validateAccount, accountValidator.validateIfNameIsUse, validateFields, accountController.create); // http://localhost:3900/api/account
router.put("/:id", accountValidator.validateAccount, accountValidator.validateIfNameIsUse, validateFields, accountController.update); // http://localhost:3900/api/account/1
router.delete("/:id", accountController.delete); // http://localhost:3900/api/account/1

export default router;