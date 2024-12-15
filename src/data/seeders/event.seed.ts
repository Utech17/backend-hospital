import { EventInterface } from "../../interfaces";

const eventsSeeds: Partial<EventInterface>[] = [
  {
    id: 1,
    id_history: 1,
    id_type_events: 2,
    event_date: new Date("2024-01-05T10:00:00Z"),
    employee_id: 1,
    results: "Diagnóstico preliminar de infección respiratoria. Se recomienda tratamiento con antibióticos.",
  },
  {
    id: 2,
    id_history: 2,
    id_type_events: 3,
    event_date: new Date("2024-01-10T14:30:00Z"),
    employee_id: 2,
    results: "Paciente con dolor abdominal severo. Ordenados exámenes de laboratorio para determinar la causa.",
  },
  {
    id: 3,
    id_history: 3,
    id_type_events: 1,
    event_date: new Date("2024-02-01T09:00:00Z"),
    employee_id: 3,
    results: "Consulta médica general, paciente con hipertensión leve. Se recetaron medicamentos para control.",
  },
  {
    id: 4,
    id_history: 4,
    id_type_events: 4,
    event_date: new Date("2024-02-15T16:45:00Z"),
    employee_id: 1,
    results: "Intervención quirúrgica realizada con éxito, se programó seguimiento postoperatorio.",
  },
  {
    id: 5,
    id_history: 5,
    id_type_events: 2,
    event_date: new Date("2024-03-05T12:00:00Z"),
    employee_id: 2,
    results: "Diagnóstico de diabetes tipo 2. Paciente remitido a endocrinología para manejo especializado.",
  },
];

export { eventsSeeds };