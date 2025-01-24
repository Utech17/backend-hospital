import { EmployeeInterface } from "../interfaces"

export interface PayrollInterface {
    id: number;
    employee_id: number;
    startDate: Date;
    endDate: Date;
    grossSalary: number;
    deductions: number;
    netSalary: number;
    Employee?:EmployeeInterface;
}