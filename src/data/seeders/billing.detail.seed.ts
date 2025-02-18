import { BillingDetailInterface } from "../../interfaces";

const BillingDetailsSeeds: Partial<BillingDetailInterface>[] = [
  {
    billing_id: 1,
    quantity: 10,
    price: 15.5,
    num_fact: 1,
    product_id: 1,
    updatedAt: new Date("2024-01-01T12:00:00Z"),
    deletedAt: null,
  },
  {
    billing_id: 2,
    quantity: 5,
    price: 25.0,
    num_fact: 2,
    product_id: 2,
    updatedAt: new Date("2024-01-02T14:30:00Z"),
    deletedAt: null,
  },
  {
    billing_id: 3,
    quantity: 20,
    price: 12.75,
    num_fact: 3,
    product_id: 3,
    updatedAt: new Date("2024-01-03T16:45:00Z"),
    deletedAt: null,
  },
];

export { BillingDetailsSeeds };