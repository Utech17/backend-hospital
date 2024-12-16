import { ConceptInterface } from "./concept.interface";
import { PayrollInterface } from "./payroll.interface";

export interface PayrollDetailInterface {
  id: number;
  id_concept: number;
  id_payroll: number;
  amount: number;
  Concept?: ConceptInterface;
  Payroll?: PayrollInterface;
}