import { Router } from "express";
import { validateFields } from "../middlewares";
import { AppointmentController } from "../controllers";
import { AppointmentValidator } from "../validators";

const router = Router();
const appointmentController = new AppointmentController();
const appointmentValidator = new AppointmentValidator();

router.get("/", appointmentController.all); // GET: http://localhost:3900/api/appointment
router.get("/:id", appointmentController.one); // GET: http://localhost:3900/api/appointment/1
router.post("/", appointmentValidator.validateAppointment, appointmentValidator.validatePatientId, 
  appointmentValidator.validateEmployeeId, validateFields, appointmentController.create
); // POST: http://localhost:3900/api/appointment
router.put("/:id", validateFields, 
  appointmentController.update); // PUT: http://localhost:3900/api/appointment/2
router.delete("/:id", appointmentController.delete); // DELETE: http://localhost:3900/api/appointment/3

export default router;