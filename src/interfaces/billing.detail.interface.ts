import { ProductInterface } from "./product.interface";
import { BillingInterface } from "./billing.interface";

export interface BillingDetailInterface {
  billing_id?: number;
  num_fact?: number;
  product_id: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}  