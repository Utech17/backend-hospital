import { SaleInterface } from "../../interfaces";


const saleSeeds: Partial<SaleInterface>[] = [
    
  {
    id: 1,
    invoice_number: 1001,
    date: new Date("2024-01-15T00:00:00Z"),
    amount: 500.75,
    payment_type_code: 1,
    status: true,
    updatedAt: new Date("2024-01-15T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    invoice_number: 1002,
    date: new Date("2024-02-20T00:00:00Z"),
    amount: 1500.0,
    payment_type_code: 2,
    status: false,
    updatedAt: new Date("2024-02-20T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    invoice_number: 1003,
    date: new Date("2024-03-05T00:00:00Z"),
    amount: 300.5,
    payment_type_code: 1,
    status: true,
    updatedAt: new Date("2024-03-05T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 4,
    invoice_number: 1004,
    date: new Date("2024-04-10T00:00:00Z"),
    amount: 750.0,
    payment_type_code: 3,
    status: true,
    updatedAt: new Date("2024-04-10T00:00:00Z"),
    deletedAt: null,
  },
];

export {
  saleSeeds,
};
