import { ClientInterface } from "./client.interface";
import { PatientInterface } from "./patient.interface";
import { BillingDetailInterface } from "./billing.detail.interface";

export interface BillingInterface {
  id?: number | string; 
  patient_id: number | string;
  billing_date: Date;
  billing_status?: "pendiente" | "pagado" | "cancelado";
  client_id: number | string;
  updatedAt:Date;
  deletedAt?: string | Date | null;
  Client?:ClientInterface;
  Patient?:PatientInterface;
  num_fact: number;
  sale?: {
    payment_type_id: number;
  };
  billing_details?: BillingDetailInterface[];
}