import { Router } from "express";
import { validateFields } from "../middlewares";
import { BuyController } from "../controllers";
import { BuyValidator } from "../validators";

const router = Router();
const buyController = new BuyController();
const buyValidator = new BuyValidator();

router.get("/", buyController.all);
router.get("/:id", buyController.one);
router.post(
    "/", 
    buyValidator.validateBuy,
    buyValidator.validateIfProductsExist,
    buyValidator.validateUniqueProductInBuy,
    validateFields, 
    buyController.create 
);
router.put(
    "/:id", 
    buyValidator.validateBuy,
    buyValidator.validateIfProductsExist,
    validateFields, 
    buyController.update
);
router.delete("/:id", buyController.delete);

export default router;