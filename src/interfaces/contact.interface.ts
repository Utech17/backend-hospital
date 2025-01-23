import { PatientInterface } from "../interfaces"

export interface ContactInterface {
    id?: number | string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    relationship: "family" | "friend" | "colleague" | "other"; // Examples
    patient_id?: number | string;
    patient?: PatientInterface;
}