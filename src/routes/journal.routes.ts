import { Router } from "express";
import { JournalController } from "../controllers";

const router = Router();
const journalController = new JournalController();

router.post("/excel", journalController.generateExcel); // Para generar el Excel con período

export default router;