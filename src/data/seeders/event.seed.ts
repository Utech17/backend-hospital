import { EventInterface } from "../../interfaces";

const eventsSeeds: Partial<EventInterface>[] = [
  {
    id: 1,
    history_id: 1,
    type_events_id: 2,
    event_date: new Date("2024-01-05T10:00:00Z"),
    employee_id: 1,
    results: "Diagnóstico preliminar de infección respiratoria. Se recomienda tratamiento con antibióticos.",
  },
  {
    id: 2,
    history_id: 2,
    type_events_id: 3,
    event_date: new Date("2024-01-10T14:30:00Z"),
    employee_id: 2,
    results: "Paciente con dolor abdominal severo. Ordenados exámenes de laboratorio para determinar la causa.",
  },
  {
    id: 3,
    history_id: 3,
    type_events_id: 1,
    event_date: new Date("2024-02-01T09:00:00Z"),
    employee_id: 3,
    results: "Consulta médica general, paciente con hipertensión leve. Se recetaron medicamentos para control.",
  },
  {
    id: 4,
    history_id: 4,
    type_events_id: 4,
    event_date: new Date("2024-02-15T16:45:00Z"),
    employee_id: 1,
    results: "Intervención quirúrgica realizada con éxito, se programó seguimiento postoperatorio.",
  },
  {
    id: 5,
    history_id: 5,
    type_events_id: 2,
    event_date: new Date("2024-03-05T12:00:00Z"),
    employee_id: 2,
    results: "Diagnóstico de diabetes tipo 2. Paciente remitido a endocrinología para manejo especializado.",
  },
];

export { eventsSeeds };