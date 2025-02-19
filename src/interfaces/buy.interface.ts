import { SupplierInterface } from "./supplier.interface";
import { BuyDetailsInterface } from "./buy.details.Interface";

export interface BuyInterface {
  id?: number;
  invoice_number: number;
  date: Date;
  supplier_id: number;
  department_id: number;
  status: 'pendiente' | 'aprobada' | 'rechazada';
  updatedAt?: Date;
  deletedAt?: Date | null;
  supplier?: SupplierInterface;
  buy_details?: BuyDetailsInterface[];
}