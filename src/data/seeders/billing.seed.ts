import { BillingInterface } from "../../interfaces";

const billingSeeds: Partial<BillingInterface>[] = [
  {
    id: 1,
    patient_id: 1,
    billing_date: new Date("2024-12-01"),
    client_id: 1,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    patient_id: 2,
    billing_date: new Date("2024-12-02"),
    client_id: 2,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    patient_id: 3, 
    billing_date: new Date("2024-12-03"),
    client_id: 3, 
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export { billingSeeds };