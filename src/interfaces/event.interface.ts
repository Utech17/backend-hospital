import { MedicalHistoryInterface } from "./medical.history.interface";
import { EventTypeInterface } from "./event.type.interface";
import { EmployeeInterface } from "./employee.interface";

export interface EventInterface {
    id?: number | string;
    history_id?: number | string;
    type_events_id?: number | string;
    event_date: Date;
    employee_id?: number | string;
    results: string;
    medicalHistory?: MedicalHistoryInterface ;
    eventType?: EventTypeInterface;
    employee?: EmployeeInterface;
}