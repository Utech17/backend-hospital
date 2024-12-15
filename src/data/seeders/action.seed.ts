import { ActionInterface } from "../../interfaces";

const actionsSeeds: Partial<ActionInterface>[] = [
  {
    id: 1,
    name_actions: "Consulta médica",
    description: "Evaluación general del estado de salud del paciente.",
  },
  {
    id: 2,
    name_actions: "Prescripción de medicamentos",
    description: "Recomendación de medicamentos para tratar una condición específica.",
  },
  {
    id: 3,
    name_actions: "Orden de exámenes",
    description: "Solicitud de pruebas de laboratorio o estudios de imagen.",
  },
  {
    id: 4,
    name_actions: "Procedimiento menor",
    description: "Intervenciones menores como suturas o extracciones simples.",
  },
  {
    id: 5,
    name_actions: "Remisión a especialista",
    description: "Derivación del paciente a un médico especializado.",
  },
  {
    id: 6,
    name_actions: "Seguimiento",
    description: "Control periódico para evaluar el progreso del tratamiento.",
  },
  {
    id: 7,
    name_actions: "Hospitalización",
    description: "Admisión del paciente para un tratamiento más intensivo.",
  },
  {
    id: 8,
    name_actions: "Alta médica",
    description: "Finalización del tratamiento y autorización para salir del hospital.",
  },
  {
    id: 9,
    name_actions: "Intervención quirúrgica",
    description: "Procedimientos quirúrgicos programados o de emergencia.",
  },
  {
    id: 10,
    name_actions: "Atención de emergencia",
    description: "Acciones inmediatas para estabilizar una condición crítica.",
  },
];

export { actionsSeeds };