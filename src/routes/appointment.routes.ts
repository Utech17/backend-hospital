import { Router } from "express";
import { validateFields } from "../middlewares";
import { AppointmentController } from "../controllers";
import { AppointmentValidator } from "../validators";

const router = Router();
const appointmentController = new AppointmentController();
const appointmentValidator = new AppointmentValidator();

router.get("/", appointmentController.all); // GET: http://localhost:3800/api/appointments
router.get("/:id", appointmentController.one); // GET: http://localhost:3800/api/appointments/:id
router.post("/", appointmentValidator.validateAppointment, appointmentValidator.validatePatientId, 
  appointmentValidator.validateEmployeeId, validateFields, appointmentController.create
); // POST: http://localhost:3800/api/appointments
router.put("/:id", appointmentValidator.validateAppointmentUpdate, validateFields, 
  appointmentController.update); // PUT: http://localhost:3800/api/appointments/:id
router.delete("/:id", appointmentController.delete); // DELETE: http://localhost:3800/api/appointments/:id

export default router;