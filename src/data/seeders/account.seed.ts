import { AccountInterface } from "../../interfaces";

const accountsSeeds: Partial<AccountInterface>[] = [
  {
    id: 1,
    name: "Cuenta principal hospitalaria",
    type_account: "current",
    status: true,
  },
  {
    id: 2,
    name: "Cuenta de ahorros para emergencias",
    type_account: "savings",
    status: true,
  },
  {
    id: 3,
    name: "Cuenta de operaciones del departamento de farmacia",
    type_account: "current",
    status: false,
  },
  {
    id: 4,
    name: "Cuenta de ahorros del departamento de urgencias",
    type_account: "savings",
    status: true,
  },
  {
    id: 5,
    name: "Cuenta de inversiones a largo plazo",
    type_account: "savings",
    status: true,
  },
];

export { accountsSeeds };