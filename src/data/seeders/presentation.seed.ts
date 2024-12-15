import { PresentationInterface } from "../../interfaces";

const PresentationSeeds: Partial<PresentationInterface>[] = [
  {
    cod_pres: 1,
    quantity: "12",
    unit: "Caja",
    weight: 5.5,
    status: 1,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_pres: 2,
    quantity: "24",
    unit: "Paquete",
    weight: 12.0,
    status: 1,
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_pres: 3,
    quantity: "6",
    unit: "Botella",
    weight: 2.0,
    status: 1,
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
    deletedAt: null,
  },
];

export {
    PresentationSeeds,
};