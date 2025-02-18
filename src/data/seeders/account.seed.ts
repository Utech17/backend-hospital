import { AccountInterface } from "../../interfaces";

const accountsSeeds: Partial<AccountInterface>[] = [
  {
    name: "Banco",
    type_account: "activo",
    balance:52000.0,
    status: true,
  },
  {
    name: "Capital",
    type_account: "capital",
    balance:50000.0,
    status: true,
  },
  {
    name: "Compras",
    type_account: "egreso", 
    balance:10500.0,
    status: true,
  },
  {
    name: "Ventas",
    type_account: "ingreso",
    balance:12500.0,
    status: true,
  },
];

export { accountsSeeds };