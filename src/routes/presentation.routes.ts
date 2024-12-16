import { Router } from "express";
import { validateFields } from "../middlewares";
import { PresentationController } from "../controllers";
import { PresentationValidator } from "../validators";

const router = Router();
const presentationController = new PresentationController();
const presentationValidator = new PresentationValidator();

router.get("/", presentationController.all); // GET: http://localhost:3800/api/presentations
router.get("/:id", presentationController.one); // GET: http://localhost:3800/api/presentations/:id
router.post("/",presentationValidator.validatePresentation,presentationValidator.validatePresentationId,
  validateFields,presentationController.create); // POST: http://localhost:3800/api/presentations
router.put("/:id",presentationValidator.validatePresentation,validateFields,
  presentationController.update); // PUT: http://localhost:3800/api/presentations/:id
router.delete("/:id", presentationController.delete); // DELETE: http://localhost:3800/api/presentations/:id

export default router;