import { MedicalHistoryInterface } from "./medical.history.interface";
import { EventTypeInterface } from "./event.type.interface";
import { EmployeeInterface } from "./employee.interface";

export interface EventInterface {
    id?: number | string;
    id_history?: number | string;
    id_type_events?: number | string;
    event_date: Date;
    employee_id?: number | string;
    results: string;
    medicalHistory?: MedicalHistoryInterface ;
    eventType?: EventTypeInterface;
    employee?: EmployeeInterface;
}