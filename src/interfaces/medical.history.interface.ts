import { PatientInterface } from "./patient.interface";

export interface MedicalHistoryInterface {
    id?: number | string;
    patient_id: number | string;
    admission_date: Date;
    discharge_date?: string | Date | null;
    diagnosis: string;
    treatment: string;
    createdAt:Date;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    patient?:PatientInterface;
}