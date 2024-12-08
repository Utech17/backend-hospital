export interface PatientInterface {
    id?: number | string;
    nickname?: string;
    firstName: string; 
    lastName: string;
    birthDate: Date;
    gender: string;
    identifier: string; 
    registrationDate?: Date;
  }
  