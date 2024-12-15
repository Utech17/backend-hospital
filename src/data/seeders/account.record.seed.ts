import { AccountRecordInterface } from "../../interfaces";

const accountRecordsSeeds: Partial<AccountRecordInterface>[] = [
  {
    id: 1,
    type: "income",
    description: "Ingreso por tratamiento quirúrgico",
    amount: 2000.00,
    id_account: 1,
    status: true,
  },
  {
    id: 2,
    type: "expense",
    description: "Gasto en medicamentos para urgencias",
    amount: 500.00,
    id_account: 4,
    status: true,
  },
  {
    id: 3,
    type: "income",
    description: "Ingreso por consulta médica general",
    amount: 150.00,
    id_account: 1,
    status: true, 
  },
  {
    id: 4,
    type: "expense",
    description: "Gasto en suministros médicos para operaciones",
    amount: 1200.00,
    id_account: 2,
    status: true,
  },
  {
    id: 5,
    type: "income",
    description: "Ingreso por venta de equipo médico",
    amount: 3000.00,
    id_account: 5,
    status: true, 
  },
  {
    id: 6,
    type: "expense",
    description: "Gasto por mantenimiento de equipo de rayos X",
    amount: 800.00,
    id_account: 1,
    status: false, 
  },
];

export { accountRecordsSeeds };