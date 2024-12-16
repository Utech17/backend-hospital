import { Router } from "express";
import { validateFields } from "../middlewares";
import { PatientController } from "../controllers";
import { PatientValidator } from "../validators";

const router = Router();
const patientController = new PatientController();
const patientValidator = new PatientValidator();

router.get("/", patientController.all); // GET: http://localhost:3800/api/patients
router.get("/:id", patientValidator.validatePatientId, patientController.one); // GET: http://localhost:3800/api/patients/:id
router.post("/",patientValidator.validatePatient,validateFields,
  patientController.create); // POST: http://localhost:3800/api/patients
router.put("/:id",patientValidator.validatePatientId,patientValidator.validatePatient,
  validateFields,patientController.update); // PUT: http://localhost:3800/api/patients/:id
router.delete("/:id",patientValidator.validatePatientId,
  patientController.delete); // DELETE: http://localhost:3800/api/patients/:id

export default router;