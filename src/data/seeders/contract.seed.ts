import { ContractInterface } from "../../interfaces";

const contractSeeds: Partial<ContractInterface>[] = [
  {
    id: 1,
    employee_id: 1,
    working_day_id: 1,
    charge_id: 3,
    start_day: new Date("2023-01-01"),
    end_day: new Date("2023-12-31"),
    base_salary: 1500,
    benefits: "Seguro médico, vacaciones pagadas, bono de transporte.",
  },
  {
    id: 2,
    employee_id: 2,
    working_day_id: 2,
    charge_id: 2,
    start_day: new Date("2023-03-01"),
    end_day: new Date("2023-11-30"),
    base_salary: 1200,
    benefits: "Seguro dental, días de enfermedad pagados.",
  },
  {
    id: 3,
    employee_id: 3,
    working_day_id: 1,
    charge_id: 4,
    start_day: new Date("2023-06-01"),
    end_day: new Date("2024-05-31"),
    base_salary: 1800,
    benefits: "Plan de retiro, seguro de vida, bonos por desempeño.",
  },
  {
    id: 4,
    employee_id: 4,
    working_day_id: 3,
    charge_id: 5,
    start_day: new Date("2022-09-01"),
    end_day: new Date("2023-08-31"),
    base_salary: 2000,
    benefits: "Estipendio de educación, asistencia de vivienda.",
  },
  {
    id: 5,
    employee_id: 5,
    working_day_id: 1,
    charge_id: 1,
    start_day: new Date("2024-01-01"),
    end_day: new Date("2024-12-31"),
    base_salary: 1000,
    benefits: "Seguro médico básico, transporte gratuito.",
  },
];

export { contractSeeds };