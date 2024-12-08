import { Router } from "express";
import { validateFields } from "../middlewares";
import { MedicalHistoryController } from "../controllers";
import { MedicalHistoryValidator } from "../validators";

const medicalHistoryValidator = new MedicalHistoryValidator();
const router = Router();
const medicalHistoryController = new MedicalHistoryController();

router.get("/", medicalHistoryController.all); // http://localhost:3800/api/medical-history
router.get("/:id", medicalHistoryController.one); // http://localhost:3800/api/medical-history/1
router.post("/",medicalHistoryValidator.validateMedicalHistory,validateFields,medicalHistoryController.create
); // http://localhost:3800/api/medical-history
router.put("/:id",medicalHistoryValidator.validateMedicalHistory,validateFields,medicalHistoryController.update
); // http://localhost:3800/api/medical-history/1
router.delete("/:id", medicalHistoryController.delete); // http://localhost:3800/api/medical-history/1

export default router;