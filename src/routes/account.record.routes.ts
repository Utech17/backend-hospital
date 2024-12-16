import { Router } from "express";
import { validateFields } from "../middlewares";
import { AccountRecordController } from "../controllers";
import { AccountRecordValidator } from "../validators";

const accountRecordValidator = new AccountRecordValidator();
const router = Router();
const accountRecordController = new AccountRecordController();

router.get("/", accountRecordController.all); // http://localhost:3800/api/account-records
router.get("/:id", accountRecordController.one); // http://localhost:3800/api/account-records/1
router.post("/", accountRecordValidator.validateAccountRecord, validateFields, accountRecordController.create); // http://localhost:3800/api/account-records
router.put("/:id", accountRecordValidator.validateAccountRecord, validateFields, accountRecordController.update); // http://localhost:3800/api/account-records/1
router.delete("/:id", accountRecordController.delete); // http://localhost:3800/api/account-records/1

export default router;