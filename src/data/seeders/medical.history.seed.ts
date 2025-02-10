import { MedicalHistoryInterface } from "../../interfaces";

const medicalHistoriesSeeds: Partial<MedicalHistoryInterface>[] = [
  {
    id: 1,
    patient_id: 1,
    admission_date: new Date("2024-01-01"),
    discharge_date: new Date("2024-01-05"),
    diagnosis: "Neumonía leve",
    treatment: "Antibióticos y reposo en casa",
  },
  {
    id: 2,
    patient_id: 2,
    admission_date: new Date("2024-02-10"),
    discharge_date: new Date("2024-02-15"),
    diagnosis: "Fractura de pierna",
    treatment: "Inmovilización, yeso y analgésicos",
  },
  {
    id: 3,
    patient_id: 3,
    admission_date: new Date("2024-03-05"),
    discharge_date: new Date("2024-03-07"),
    diagnosis: "Migraña crónica",
    treatment: "Terapia de relajación y medicación específica",
  },
  {
    id: 4,
    patient_id: 4,
    admission_date: new Date("2024-04-01"),
    discharge_date: null,
    diagnosis: "COVID-19 severo",
    treatment: "Oxígeno suplementario y monitoreo constante",
  },
  {
    id: 5,
    patient_id: 5,
    admission_date: new Date("2024-05-20"),
    discharge_date: new Date("2024-05-25"),
    diagnosis: "Hipertensión arterial",
    treatment: "Control de dieta, medicación antihipertensiva",
  },
  {
    id: 6,
    patient_id: 6,
    admission_date: new Date("2024-06-15"),
    discharge_date: new Date("2024-06-20"),
    diagnosis: "Ansiedad generalizada",
    treatment: "Terapia cognitivo-conductual y medicación temporal",
  },
];

export {
  medicalHistoriesSeeds,
};