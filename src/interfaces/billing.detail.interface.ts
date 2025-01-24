import { ProductInterface } from ".";
import { BillingInterface } from ".";

export interface BillingDetailInterface {
    billing_id?: number | string;
    quantity: number | string;
    price: number | string;
    num_fact: number | string;
    product_id: number | string;
    updatedAt: Date;
    deletedAt?: string | Date | null;
    Product?: ProductInterface;
    Billing?: BillingInterface;
  }  