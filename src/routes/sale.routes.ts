import { Router } from "express";
import { validateFields } from "../middlewares";
import { SaleController } from "../controllers";
import { SaleValidator } from "../validators";

const router = Router();
const saleController = new SaleController();
const saleValidator = new SaleValidator();

router.get("/", saleController.all);
router.get("/:id", saleController.one);
router.post(
    "/",
    saleValidator.validateSale,
    saleValidator.validatePaymentType,
    validateFields,
    saleController.create
);
router.put(
    "/:id",
    saleValidator.validateSale,
    validateFields,
    saleController.update
);
router.delete("/:id", saleController.delete);

export default router;
