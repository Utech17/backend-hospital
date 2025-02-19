import { PatientInterface } from "../interfaces";
import { EmployeeInterface } from "../interfaces";

export interface AppointmentInterface {
    id?: number | string;
    patient_id: number | string;
    employee_id: number | string;
    appointment_date: Date;
    appointment_status: "Pendiente" | "Completada" | "Cancelada";
    appointment_area: "General" | "Especialidad" | "Emergencia";
    createdAt:Date;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    Patient?: PatientInterface;
    Employee?: EmployeeInterface;
  }