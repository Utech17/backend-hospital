import { PayrollInterface } from "../../interfaces";

const payrollSeeds: Partial<PayrollInterface>[] = [
  {
    id: 1,
    employee_id: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 1500,
    deductions: 300,
    netSalary: 1200,
  },
  {
    id: 2,
    employee_id: 2,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 2000,
    deductions: 400,
    netSalary: 1600,
  },
  {
    id: 3,
    employee_id: 3,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 1800,
    deductions: 350,
    netSalary: 1450,
  },
  {
    id: 4,
    employee_id: 4,
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-31"),
    grossSalary: 1700,
    deductions: 300,
    netSalary: 1400,
  },
  {
    id: 5,
    employee_id: 5,
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-31"),
    grossSalary: 1900,
    deductions: 450,
    netSalary: 1450,
  },
];

export { payrollSeeds };