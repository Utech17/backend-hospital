import { Router } from "express";
import { validateFields } from "../middlewares";
import { OrganizationalUnitsController } from "../controllers";
import { OrganizationalUnitsValidator } from "../validators";

const router = Router();
const organizational_unitsController = new OrganizationalUnitsController();
const organizational_unitsValidator = new OrganizationalUnitsValidator();

router.get("/", organizational_unitsController.all); 
router.get("/:id", organizational_unitsValidator.validateorganizational_units, organizational_unitsController.one); 
router.post(
  "/",
  organizational_unitsValidator.validateorganizational_units, 
  organizational_unitsValidator.validateIfNameIsUse, 
  validateFields, 
  organizational_unitsController.create 
);
router.put(
  "/:id",
  organizational_unitsValidator.validateorganizational_units,
  organizational_unitsValidator.validateIfIdExist, 
  organizational_unitsValidator.validateIfNameIsUse, 
  validateFields, 
  organizational_unitsController.update 
);

router.delete("/:id", organizational_unitsController.delete); 

export default router;