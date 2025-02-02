import { Router } from "express";
import { validateFields } from "../middlewares";
import { AttendanceController } from "../controllers";
import { AttendanceValidator } from "../validators";

const router = Router();
const attendanceController = new AttendanceController();
const attendanceValidator = new AttendanceValidator();

router.get("/", attendanceController.all); // GET: http://localhost:3900/api/attendance
router.get("/:id", attendanceController.one); // GET: http://localhost:3900/api/attendance/1
router.post("/",attendanceValidator.validateAttendance,attendanceValidator.validateEmployeeId,validateFields, 
  attendanceController.create); // POST: http://localhost:3900/api/attendance
router.put("/:id",attendanceValidator.validateAttendance,validateFields,
  attendanceController.update); // PUT: http://localhost:3900/api/attendance/2
router.delete("/:id", attendanceController.delete); // DELETE: http://localhost:3900/api/attendance/3

export default router;
