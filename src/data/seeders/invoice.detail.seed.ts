import { InvoiceDetailInterface } from "../../interfaces";

const invoiceDetailsSeeds: Partial<InvoiceDetailInterface>[] = [
  {
    id: 1,
    quantity: 10,
    price: 15.5,
    num_fact: 1001,
    id_product: 1,
    updatedAt: new Date("2024-01-01T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    quantity: 5,
    price: 25.0,
    num_fact: 1002,
    id_product: 2,
    updatedAt: new Date("2024-01-02T14:30:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    quantity: 20,
    price: 12.75,
    num_fact: 1003,
    id_product: 3,
    updatedAt: new Date("2024-01-03T16:45:00Z"),
    deletedAt: null,
  },
];

export { invoiceDetailsSeeds };