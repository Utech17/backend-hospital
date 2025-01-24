import { TypeInterface } from "../../interfaces";

const typeSeeds: Partial<TypeInterface>[] = [
  {
    cod_type: 1,
    description_type: "Medicamentos",
    status: 1,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_type: 2,
    description_type: "Equipos Médicos",
    status: 1,
    createdAt: new Date("2024-01-02T00:00:00Z"),
    updatedAt: new Date("2024-01-02T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_type: 3,
    description_type: "Suministros Hospitalarios",
    status: 1,
    createdAt: new Date("2024-01-03T00:00:00Z"),
    updatedAt: new Date("2024-01-03T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_type: 4,
    description_type: "Productos Quirúrgicos",
    status: 1,
    createdAt: new Date("2024-01-04T00:00:00Z"),
    updatedAt: new Date("2024-01-04T00:00:00Z"),
    deletedAt: null,
  },
  {
    cod_type: 5,
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