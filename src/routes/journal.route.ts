import { Router } from "express";
import { validateFields } from "../middlewares";
import { JournalController } from "../controllers";
import { JournalValidator } from "../validators";

const journalValidator = new JournalValidator();
const router = Router();
const journalController = new JournalController();

router.get("/", journalController.all); // http://localhost:3800/api/journals
router.get("/:id", journalController.one); // http://localhost:3800/api/journals/1
router.post("/", journalValidator.validateJournal, validateFields, journalController.create); // http://localhost:3800/api/journals
router.put("/:id", journalValidator.validateJournal, validateFields, journalController.update); // http://localhost:3800/api/journals/1
router.delete("/:id", journalController.delete); // http://localhost:3800/api/journals/1

export default router;