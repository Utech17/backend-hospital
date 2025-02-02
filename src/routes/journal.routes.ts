import { Router } from "express";
import { validateFields } from "../middlewares";
import { JournalController } from "../controllers";
import { JournalValidator } from "../validators";

const journalValidator = new JournalValidator();
const router = Router();
const journalController = new JournalController();

router.get("/", journalController.all); // http://localhost:3900/api/journal
router.get("/:id", journalController.one); // http://localhost:3900/api/journal/1
router.post("/", journalValidator.validateJournal, validateFields, journalController.create); // http://localhost:3900/api/journal
router.put("/:id", journalValidator.validateJournal, validateFields, journalController.update); // http://localhost:3900/api/journal/1
router.delete("/:id", journalController.delete); // http://localhost:3900/api/journal/1

export default router;