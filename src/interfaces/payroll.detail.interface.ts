import { ConceptInterface } from "./concept.interface";
import { PayrollInterface } from "./payroll.interface";

export interface PayrollDetailInterface {
  id?: number | string;
  id_concept: number | string;
  id_payroll: number | string;
  amount: number;
  Concept?: ConceptInterface;
  Payroll?: PayrollInterface;
}