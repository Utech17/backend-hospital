import { EventTypeInterface } from "../interfaces";

const eventTypesSeeds: Partial<EventTypeInterface>[] = [
  {
    id: 1,
    event_name: "Consulta General",
  },
  {
    id: 2,
    event_name: "Examen de Laboratorio",
  },
  {
    id: 3,
    event_name: "Intervención Quirúrgica",
  },
  {
    id: 4,
    event_name: "Diagnóstico Médico",
  },
  {
    id: 5,
    event_name: "Tratamiento Especializado",
  },
];

export { eventTypesSeeds };