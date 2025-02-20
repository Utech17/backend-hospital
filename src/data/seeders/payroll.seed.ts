import { PayrollInterface } from "../../interfaces";

const payrollSeeds: Partial<PayrollInterface>[] = [
  {
    employee_id: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 1500,
    deductions: 300,
    netSalary: 1200,
  },
  {
    employee_id: 2,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 2000,
    deductions: 400,
    netSalary: 1600,
  },
  {
    employee_id: 3,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-15"),
    grossSalary: 1800,
    deductions: 350,
    netSalary: 1450,
  },
  {
    employee_id: 4,
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-31"),
    grossSalary: 1700,
    deductions: 300,
    netSalary: 1400,
  },
  {
    employee_id: 5,
    startDate: new Date("2024-01-16"),
    endDate: new Date("2024-01-31"),
    grossSalary: 1900,
    deductions: 450,
    netSalary: 1450,
  },
];

export { payrollSeeds };