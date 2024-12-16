import { Router } from "express";
import { InvoiceDetailValidator } from "../validators";
import { InvoiceDetailController } from "../controllers";

const router = Router();
const invoiceDetailController = new InvoiceDetailController();
const invoiceDetailValidator = new InvoiceDetailValidator();

router.get("/", invoiceDetailController.all);
router.get("/:id", invoiceDetailValidator.validateInvoiceDetailId, invoiceDetailController.one);
router.post("/", invoiceDetailValidator.validateInvoiceDetail, invoiceDetailController.create);
router.put("/:id", invoiceDetailValidator.validateInvoiceDetailId, invoiceDetailValidator.validateInvoiceDetail, invoiceDetailController.update);
router.delete("/:id", invoiceDetailValidator.validateInvoiceDetailId, invoiceDetailController.delete);

export default router;