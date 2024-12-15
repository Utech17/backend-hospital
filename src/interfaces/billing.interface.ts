import { ClientInterface } from "./client.interface";
import { PatientInterface } from "./patient.interface";

export interface BillingInterface {
  id?: number | string; 
  patient_id: number | string;
  billing_date: Date;
  billing_status?: "pending" | "paid" | "cancelled";
  client_id: number | string;
  updatedAt:Date;
  deletedAt:Date;
  Client?:ClientInterface;
  Patient?:PatientInterface;
}