import { ActionInterface } from "../../interfaces";

const actionsSeeds: Partial<ActionInterface>[] = [
  {
    name_actions: "Consulta médica",
    description: "Evaluación general del estado de salud del paciente.",
  },
  {
    name_actions: "Prescripción de medicamentos",
    description: "Recomendación de medicamentos para tratar una condición específica.",
  },
  {
    name_actions: "Orden de exámenes",
    description: "Solicitud de pruebas de laboratorio o estudios de imagen.",
  },
  {
    name_actions: "Procedimiento menor",
    description: "Intervenciones menores como suturas o extracciones simples.",
  },
  {
    name_actions: "Remisión a especialista",
    description: "Derivación del paciente a un médico especializado.",
  },
  {
    name_actions: "Seguimiento",
    description: "Control periódico para evaluar el progreso del tratamiento.",
  },
  {
    name_actions: "Hospitalización",
    description: "Admisión del paciente para un tratamiento más intensivo.",
  },
  {
    name_actions: "Alta médica",
    description: "Finalización del tratamiento y autorización para salir del hospital.",
  },
  {
    name_actions: "Intervención quirúrgica",
    description: "Procedimientos quirúrgicos programados o de emergencia.",
  },
  {
    name_actions: "Atención de emergencia",
    description: "Acciones inmediatas para estabilizar una condición crítica.",
  },
];

export { actionsSeeds };