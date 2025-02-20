import { BillingInterface } from "../../interfaces";

const billingSeeds: Partial<BillingInterface>[] = [
  {
    patient_id: 1,
    billing_date: new Date("2024-12-01"),
    client_id: 1,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    patient_id: 2,
    billing_date: new Date("2024-12-02"),
    client_id: 2,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    patient_id: 3, 
    billing_date: new Date("2024-12-03"),
    client_id: 3, 
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export { billingSeeds };