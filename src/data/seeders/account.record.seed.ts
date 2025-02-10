import { AccountRecordInterface } from "../../interfaces";

const accountRecordsSeeds: Partial<AccountRecordInterface>[] = [
  {
    id: 1,
    account_id: 1,
    type: "D", // Debe
    description: "Registro de Banco",
    amount: 1000.00,
  },
  {
    id: 2,
    account_id: 2,
    type: "D", // Debe
    description: "Registro de Caja",
    amount: 500.00,
  },
  {
    id: 3,
    account_id: 3,
    type: "D", // Debe
    description: "Registro de Clientes",
    amount: 1500.00,
  },
  {
    id: 4,
    account_id: 4,
    type: "H", // Haber
    description: "Registro de Proveedores",
    amount: 2000.00,
  },
  {
    id: 5,
    account_id: 5,
    type: "H", // Haber
    description: "Registro de Capital",
    amount: 3000.00,
  },
  {
    id: 6,
    account_id: 6,
    type: "H", // Haber
    description: "Registro de Ingresos",
    amount: 4000.00,
  },
  {
    id: 7,
    account_id: 7,
    type: "D", // Debe
    description: "Registro de Gastos",
    amount: 2500.00,
  },
  {
    id: 8,
    account_id: 8,
    type: "D", // Debe
    description: "Registro de Inversiones",
    amount: 3500.00,
  },
  {
    id: 9,
    account_id: 9,
    type: "H", // Haber
    description: "Registro de Deudas a Largo Plazo",
    amount: 4500.00,
  },
  {
    id: 10,
    account_id: 10,
    type: "H", // Haber
    description: "Registro de Reservas",
    amount: 5000.00,
  },
];

export { accountRecordsSeeds };