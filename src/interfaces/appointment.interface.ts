import { PatientInterface } from "./patient.interface";
import { EmployeeInterface } from "./employee.interface";

export interface AppointmentInterface {
    id?: number | string;
    patient_id: number | string;
    employee_id: number | string;
    appointment_date: Date;
    appointment_status: "Scheduled" | "Completed" | "Cancelled";
    appointment_area: "General" | "Specialty" | "Emergency";
    Patient?: PatientInterface;
    Employee?: EmployeeInterface;
  }