import { Router } from "express";
import { validateFields } from "../middlewares";
import { ClientController } from "../controllers";
import { ClientValidator } from "../validators";

const clientValidator = new ClientValidator();
const router = Router();
const clientController=new ClientController();

router.get("/", clientController.all); // http://localhost:3900/api/client
router.get("/:id", clientController.one);// http://localhost:3900/api/client/1
router.post("/",clientValidator.validateClient,clientValidator.validateIfEmailIsUse,clientValidator.validateIfPhone_numberIsUse,
  validateFields,clientController.create);// http://localhost:3900/api/client
router.put("/:id",clientValidator.validateClient,clientValidator.validateIfIdExist,clientValidator.validateIfEmailIsUse,
  clientValidator.validateIfPhone_numberIsUse,validateFields,clientController.update);// http://localhost:3900/api/client/1
router.delete("/:id", clientController.delete); // http://localhost:3900/api/client/1
export default router;