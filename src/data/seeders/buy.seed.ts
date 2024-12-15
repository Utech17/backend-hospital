import { BuyInterface } from "../../interfaces";

const buySeeds: Partial<BuyInterface>[] = [
    
  {
    id: 1,
    invoice_number: 1001,
    date: new Date("2024-12-13T00:00:00Z"),
    amount: 100.00,
    status: true,
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    invoice_number: 1002,
    date: new Date("2024-12-13T00:00:00Z"),
    amount: 200.00,
    status: false,
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    invoice_number: 1003,
    date: new Date("2024-12-13T00:00:00Z"),
    amount: 300.00,
    status: true,
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 4,
    invoice_number: 1004,
    date: new Date("2024-12-13T00:00:00Z"),
    amount: 400.00,
    status: true,
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
];

export {
  buySeeds,
};