import { Router } from "express";
import { validateFields } from "../middlewares";
import { BuyDetailsController } from "../controllers"; 
import { BuyDetailsValidator } from "../validators";

const router = Router();
const buyDetailsController = new BuyDetailsController();
const buyDetailsValidator = new BuyDetailsValidator();

router.get("/", buyDetailsController.all);
router.get("/:id_compra/:id_producto", buyDetailsController.one);
router.post(
  "/",
  buyDetailsValidator.validateBuyDetails,
  validateFields,
  buyDetailsController.create
);
router.put(
  "/:id_compra/:id_producto",
  buyDetailsValidator.validateBuyDetails,
  validateFields,
  buyDetailsController.update
);
router.delete("/:id_compra/:id_producto", buyDetailsController.delete);

export default router;