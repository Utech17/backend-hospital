import { Router } from "express";
import { validateFields } from "../middlewares";
import { ContractController } from "../controllers";
import { ContractValidator } from "../validators";

const contractValidator = new ContractValidator();
const router = Router();
const contractController=new ContractController();

router.get("/", contractController.all);//http://localhost:3900/api/contract
router.get("/:id", contractController.one);//http://localhost:3900/api/contract/1
router.post("/",contractValidator.validateContract,validateFields,
  contractValidator.validateDates, contractController.create);//http://localhost:3900/api/contract
router.put("/:id",contractValidator.validateContract,validateFields,
  contractValidator.validateDates, contractController.update);//http://localhost:3900/api/contract/2

export default router;