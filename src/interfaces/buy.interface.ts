//import { SupplierInterface } from "./supplier.interface";

export interface BuyInterface {
    id?: number | string;
    invoice_number: number;
    date: Date;
    amount: number;
    supplier_id: number | string;
    status: boolean;
    updatedAt:Date;
    deletedAt?: string | Date | null;
//    Supplier?:SupplierInterface;
}