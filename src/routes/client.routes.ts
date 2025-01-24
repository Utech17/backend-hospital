import { Router } from "express";
import { validateFields } from "../middlewares";
import { ClientController } from "../controllers";
import { ClientValidator } from "../validators";

const clientValidator = new ClientValidator();
const router = Router();
const clientController=new ClientController();

router.get("/", clientController.all);
router.get("/:id", clientController.one);
router.post("/",clientValidator.validateClient,clientValidator.validateIfEmailIsUse,clientValidator.validateIfPhone_numberIsUse,
  validateFields,clientController.create);
router.put("/:id",clientValidator.validateClient,clientValidator.validateIfIdExist,clientValidator.validateIfEmailIsUse,
  clientValidator.validateIfPhone_numberIsUse,validateFields,clientController.update);
router.delete("/:id", clientController.delete); 
export default router;