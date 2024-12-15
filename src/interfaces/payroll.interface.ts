import { EmployeeInterface } from "../interfaces"

export interface PayrollInterface {
    id?: number;
    employeeId: number;
    startDate: Date;
    endDate: Date;
    grossSalary: number;
    deductions: number;
    netSalary: number;
    Employee?:EmployeeInterface;
}