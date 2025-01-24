import { ConceptInterface } from "./concept.interface";
import { PayrollInterface } from "./payroll.interface";

export interface PayrollDetailInterface {
  id: number;
  concept_id: number;
  payroll_id: number;
  amount: number;
  Concept?: ConceptInterface;
  Payroll?: PayrollInterface;
}