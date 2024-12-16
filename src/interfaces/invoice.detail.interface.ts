import { ProductInterface } from "../interfaces";
import { BillingInterface } from "../interfaces";

export interface InvoiceDetailInterface {
    id?: number | string;
    quantity: number | string;
    price: number | string;
    num_fact: number | string;
    id_product: number | string;
    updatedAt: Date;
    deletedAt?: string | Date | null;
    Product?: ProductInterface;
    Billing?: BillingInterface;
  }  