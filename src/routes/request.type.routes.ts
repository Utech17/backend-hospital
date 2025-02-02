import { Router } from "express";
import { validateFields } from "../middlewares";
import { RequestTypeController } from "../controllers";
import { RequestTypeValidator } from "../validators";

const requestTypeValidator = new RequestTypeValidator();
const router = Router();
const requestTypeController = new RequestTypeController();

router.get("/", requestTypeController.all); // http://localhost:3900/api/requesttype
router.get("/:id", requestTypeController.one); // http://localhost:3900/api/requesttype/1
router.post("/", requestTypeValidator.validateRequestType, requestTypeValidator.validateIfNameIsUse, validateFields, requestTypeController.create); // http://localhost:3900/api/requesttype
router.put("/:id", requestTypeValidator.validateRequestType, requestTypeValidator.validateIfNameIsUse, validateFields, requestTypeController.update); // http://localhost:3900/api/requesttype/1
router.delete("/:id", requestTypeController.delete); // http://localhost:3900/api/requesttype/1

export default router;