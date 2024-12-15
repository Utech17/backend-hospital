import { EmployeeInterface } from "./employee.interface"

export interface AttendanceInterface {
    id?: number;
    employee_id: number;
    date: Date;
    entry_time: Date;
    exit_time: Date;
    hours_worked: number;
    updatedAt:Date;
    deletedAt:Date;
    Employee?:EmployeeInterface;
  }  