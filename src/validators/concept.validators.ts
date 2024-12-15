import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { conceptServices } from "../services";

class ConceptValidator {
  public validateConcept = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be string"),
    body("concept_type").notEmpty().withMessage("Concept type is required"),
    body("concept_type").isNumeric().withMessage("Concept Type must be numeric"),
    body("formula").notEmpty().withMessage("formula is required"),
    body("formula").isNumeric().withMessage("formula must be numeric"),
    body("description").notEmpty().withMessage("description is required"),
    body("description").isString().withMessage("description must be string"),
   ];

}
export { ConceptValidator };