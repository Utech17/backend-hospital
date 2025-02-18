import { Router } from "express";
import { validateFields } from "../middlewares";
import { BuyController } from "../controllers";
import { BuyValidator } from "../validators";
import { BuyDetailsValidator } from "../validators";

const router = Router();
const buyController = new BuyController();
const buyValidator = new BuyValidator();
const buyDetailsValidator = new BuyDetailsValidator();

router.get("/", buyController.all);
router.get("/:id", buyController.one);
router.post("/", 
    buyValidator.validateBuy, 
    buyDetailsValidator.validateBuyDetails,
    buyDetailsValidator.validateBuyDetailsExistence,
    validateFields, 
    buyController.create
);
router.put("/:id", 
  buyValidator.validateIfBuyExist,
  buyValidator.validateBuy, 
  buyDetailsValidator.validateBuyDetails,
  buyDetailsValidator.validateBuyDetailsExistence,
  validateFields, 
  buyController.update
);
router.delete("/:id", 
    buyValidator.validateIfBuyExist,
    buyController.delete
);

export default router;