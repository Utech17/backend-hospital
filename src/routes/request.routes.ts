import { Router } from "express";
import { validateFields } from "../middlewares";
import { RequestController } from "../controllers";
import { RequestValidator } from "../validators";

const requestValidator = new RequestValidator();
const router = Router();
const requestController = new RequestController();

router.get("/", requestController.all); // http://localhost:3800/api/requests
router.get("/:id", requestController.one); // http://localhost:3800/api/requests/1
router.post("/", requestValidator.validateRequest, requestValidator.validateIfNameIsUse, validateFields, requestController.create); // http://localhost:3800/api/requests
router.put("/:id", requestValidator.validateRequest, requestValidator.validateIfNameIsUse, validateFields, requestController.update); // http://localhost:3800/api/requests/1
router.delete("/:id", requestController.delete); // http://localhost:3800/api/requests/1

export default router;
