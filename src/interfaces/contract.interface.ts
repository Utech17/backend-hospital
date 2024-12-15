import { ChargeInterface } from "./charge.interface"
import { WorkingDayInterface } from "./working.day.interface"
import { EmployeeInterface } from "./employee.interface"

export interface ContractInterface{
  id?: number;
  id_employee: number;
  id_workingDay: number;
  id_charge: number;
  start_day: Date;
  end_day: Date;
  base_salary:number;
  benefits: Text;
  Employee?:EmployeeInterface;
  WorkingDay?:WorkingDayInterface;
  Charge?:ChargeInterface;
}