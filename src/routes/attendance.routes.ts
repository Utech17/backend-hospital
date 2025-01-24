import { Router } from "express";
import { validateFields } from "../middlewares";
import { AttendanceController } from "../controllers";
import { AttendanceValidator } from "../validators";

const router = Router();
const attendanceController = new AttendanceController();
const attendanceValidator = new AttendanceValidator();

router.get("/", attendanceController.all); // GET: http://localhost:3800/api/attendances
router.get("/:id", attendanceController.one); // GET: http://localhost:3800/api/attendances/:id
router.post("/",attendanceValidator.validateAttendance,attendanceValidator.validateEmployeeId,validateFields, 
  attendanceController.create); // POST: http://localhost:3800/api/attendances
router.put("/:id",attendanceValidator.validateAttendance,validateFields,
  attendanceController.update); // PUT: http://localhost:3800/api/attendances/:id
router.delete("/:id", attendanceController.delete); // DELETE: http://localhost:3800/api/attendances/:id

export default router;
