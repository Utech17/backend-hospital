import { TypeInterface } from "../../interfaces";

const typeSeeds: Partial<TypeInterface>[] = [
  {
    description_type: "Medicamentos",
    status: 1,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  },
  {
    description_type: "Equipos Médicos",
    status: 1,
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
    deletedAt: null,
  },
  {
    description_type: "Suministros Hospitalarios",
    status: 1,
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
    deletedAt: null,
  },
  {
    description_type: "Productos Quirúrgicos",
    status: 1,
    createdAt: new Date("2024-01-04T00:00:00Z"),
    updatedAt: new Date("2024-01-04T00:00:00Z"),
    deletedAt: null,
  },
  {
    description_type: "Material de Diagnóstico",
    status: 1,
    createdAt: new Date("2024-01-05T00:00:00Z"),
    updatedAt: new Date("2024-01-05T00:00:00Z"),
    deletedAt: null,
  },
];

export {
  typeSeeds,
};