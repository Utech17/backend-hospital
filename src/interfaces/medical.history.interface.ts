import { PatientInterface } from "./patient.interface";

export interface MedicalHistoryInterface {
    id?: number | string;
    patient_id: number | string;
    admission_date: Date;
    discharge_date?: Date;
    diagnosis: string;
    treatment: string;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
    patient?:PatientInterface;
}