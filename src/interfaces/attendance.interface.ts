import { EmployeeInterface } from "../interfaces"

export interface AttendanceInterface {
    id?: number;
    employee_id: number;
    date: Date;
    entry_time: Date;
    exit_time: Date;
    hours_worked: number;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    Employee?:EmployeeInterface;
  }  