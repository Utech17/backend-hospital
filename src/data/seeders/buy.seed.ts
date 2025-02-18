import { BuyInterface } from "../../interfaces";

const buySeeds: Partial<BuyInterface>[] = [  
  {
    id: 1,
    invoice_number: 1,
    date: new Date("2024-12-13T00:00:00Z"),
    supplier_id: 1,
    status: "aprobada",
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    invoice_number: 2,
    date: new Date("2024-12-13T00:00:00Z"),
    supplier_id: 2,
    status: "aprobada",
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    invoice_number: 3,
    date: new Date("2024-12-13T00:00:00Z"),
    supplier_id: 3,
    status: "aprobada",
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
  {
    id: 4,
    invoice_number: 4,
    date: new Date("2024-12-13T00:00:00Z"),
    supplier_id: 2,
    status: "aprobada",
    updatedAt: new Date("2024-12-13T00:00:00Z"),
    deletedAt: null,
  },
];

export {buySeeds,};