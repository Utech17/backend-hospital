import { AccountInterface } from "../../interfaces";

const accountsSeeds: Partial<AccountInterface>[] = [
  {
    id: 1,
    name: "Banco",
    type_account: "A", // Activo
    status: true,
  },
  {
    id: 2,
    name: "Caja",
    type_account: "A", // Activo
    status: true,
  },
  {
    id: 3,
    name: "Clientes",
    type_account: "A", // Activo
    status: true,
  },
  {
    id: 4,
    name: "Proveedores",
    type_account: "P", // Pasivo
    status: true,
  },
  {
    id: 5,
    name: "Capital",
    type_account: "C", // Capital
    status: true,
  },
  {
    id: 6,
    name: "Ingresos",
    type_account: "I", // Ingresos
    status: true,
  },
  {
    id: 7,
    name: "Gastos",
    type_account: "G", // Gastos
    status: true,
  },
  {
    id: 8,
    name: "Inversiones",
    type_account: "A", // Activo
    status: true,
  },
  {
    id: 9,
    name: "Deudas a Largo Plazo",
    type_account: "P", // Pasivo
    status: true,
  },
  {
    id: 10,
    name: "Reservas",
    type_account: "C", // Capital
    status: true,
  },
];

export { accountsSeeds };