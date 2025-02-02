import { Router } from "express";
import { validateFields } from "../middlewares";
import { PresentationController } from "../controllers";
import { PresentationValidator } from "../validators";

const router = Router();
const presentationController = new PresentationController();
const presentationValidator = new PresentationValidator();

router.get("/", presentationController.all); // GET: http://localhost:3900/api/presentation
router.get("/:id", presentationController.one); // GET: http://localhost:3900/api/presentation/2
router.post("/",presentationValidator.validatePresentation,presentationValidator.validatePresentationId,
  validateFields,presentationController.create); // POST: http://localhost:3900/api/presentation
router.put("/:id",presentationValidator.validatePresentation,validateFields,
  presentationController.update); // PUT: http://localhost:3900/api/presentation/:id
router.delete("/:id", presentationController.delete); // DELETE: http://localhost:3900/api/presentation/1

export default router;