import { ChargeInterface } from "./charge.interface"
import { WorkingDayInterface } from "./working.day.interface"
import { EmployeeInterface } from "./employee.interface"

export interface ContractInterface{
  id?: number;
  employee_id: number;
  working_day_id: number;
  charge_id: number;
  start_day: Date;
  end_day: Date;
  base_salary:number;
  benefits: string;
  Employee?:EmployeeInterface;
  WorkingDay?:WorkingDayInterface;
  Charge?:ChargeInterface;
}