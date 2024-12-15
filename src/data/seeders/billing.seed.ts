import { BillingInterface } from "../../interfaces";

const billingSeeds: Partial<BillingInterface>[] = [
  {
    id: 1,
    patient_id: 1,
    billing_date: new Date("2024-12-01"),
    billing_status: "pending",
    client_id: 1,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    patient_id: 2,
    billing_date: new Date("2024-12-02"),
    billing_status: "paid",
    client_id: 2,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    patient_id: 3, 
    billing_date: new Date("2024-12-03"),
    billing_status: "cancelled",
    client_id: 3, 
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 4,
    patient_id: 4,
    billing_date: new Date("2024-12-04"),
    billing_status: "pending",
    client_id: 4,
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export { billingSeeds };