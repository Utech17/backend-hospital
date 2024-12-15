import { ContractInterface } from "../../interfaces";

const contractSeeds: Partial<ContractInterface>[] = [
  {
    id: 1,
    id_employee: 1,
    id_workingDay: 1,
    id_charge: 3,
    start_day: new Date("2023-01-01"),
    end_day: new Date("2023-12-31"),
    base_salary: 1500,
    benefits: "Seguro médico, vacaciones pagadas, bono de transporte.",
  },
  {
    id: 2,
    id_employee: 2,
    id_workingDay: 2,
    id_charge: 2,
    start_day: new Date("2023-03-01"),
    end_day: new Date("2023-11-30"),
    base_salary: 1200,
    benefits: "Seguro dental, días de enfermedad pagados.",
  },
  {
    id: 3,
    id_employee: 3,
    id_workingDay: 1,
    id_charge: 4,
    start_day: new Date("2023-06-01"),
    end_day: new Date("2024-05-31"),
    base_salary: 1800,
    benefits: "Plan de retiro, seguro de vida, bonos por desempeño.",
  },
  {
    id: 4,
    id_employee: 4,
    id_workingDay: 3,
    id_charge: 5,
    start_day: new Date("2022-09-01"),
    end_day: new Date("2023-08-31"),
    base_salary: 2000,
    benefits: "Estipendio de educación, asistencia de vivienda.",
  },
  {
    id: 5,
    id_employee: 5,
    id_workingDay: 1,
    id_charge: 1,
    start_day: new Date("2024-01-01"),
    end_day: new Date("2024-12-31"),
    base_salary: 1000,
    benefits: "Seguro médico básico, transporte gratuito.",
  },
];

export { contractSeeds };