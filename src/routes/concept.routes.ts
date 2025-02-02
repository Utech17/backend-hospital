import { Router } from "express";
import { validateFields } from "../middlewares";
import { ConceptController } from "../controllers";
import { ConceptValidator } from "../validators";

const conceptValidator = new ConceptValidator();
const router = Router();
const conceptController=new ConceptController();

router.get("/", conceptController.all);//http://localhost:3900/api/concept
router.get("/:id", conceptController.one);//http://localhost:3900/api/concept/1
router.post("/",conceptValidator.validateConcept,validateFields, conceptController.create);//http://localhost:3900/api/concept
router.put("/:id",conceptValidator.validateConcept,validateFields, conceptController.update);//http://localhost:3900/api/concept/1

export default router;