import { Router } from "express";
import { validateFields } from "../middlewares";
import { RequestTypeController } from "../controllers";
import { RequestTypeValidator } from "../validators";

const requestTypeValidator = new RequestTypeValidator();
const router = Router();
const requestTypeController = new RequestTypeController();

router.get("/", requestTypeController.all); // http://localhost:3800/api/request-types
router.get("/:id", requestTypeController.one); // http://localhost:3800/api/request-types/1
router.post("/", requestTypeValidator.validateRequestType, requestTypeValidator.validateIfNameIsUse, validateFields, requestTypeController.create); // http://localhost:3800/api/request-types
router.put("/:id", requestTypeValidator.validateRequestType, requestTypeValidator.validateIfNameIsUse, validateFields, requestTypeController.update); // http://localhost:3800/api/request-types/1
router.delete("/:id", requestTypeController.delete); // http://localhost:3800/api/request-types/1

export default router;