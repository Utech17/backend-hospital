import { Router } from "express";
import { JournalController } from "../controllers";

const router = Router();
const journalController = new JournalController();

router.post("/excel", journalController.generateExcel); // Para generar el Excel con período
router.get("/dates", journalController.getMinMaxDates); // Para obtener la fecha mínima y máxima

export default router;