import { ConceptInterface } from "../../interfaces";

const conceptSeeds: Partial<ConceptInterface>[] = [
  {
    id: 1,
    name: "Sueldo Base",
    concept_type: 1,
    formula: 1,
    description: "Compensación fija mensual o quincenal por el trabajo realizado.",
  },
  {
    id: 2,
    name: "Horas Extras",
    concept_type: 2,
    formula: 2,
    description: "Pago adicional por horas trabajadas fuera del horario regular.",
  },
  {
    id: 3,
    name: "Bonificación",
    concept_type: 1,
    formula: 3,
    description: "Ingreso extra otorgado por desempeño o logros específicos.",
  },
  {
    id: 4,
    name: "Deducción de Impuestos",
    concept_type: 3,
    formula: 4,
    description: "Monto reducido por obligaciones fiscales aplicables.",
  },
  {
    id: 5,
    name: "Seguro Social",
    concept_type: 3,
    formula: 5,
    description: "Contribución obligatoria al sistema de seguridad social.",
  },
  {
    id: 6,
    name: "Comisión por Ventas",
    concept_type: 2,
    formula: 6,
    description: "Porcentaje ganado basado en las ventas realizadas.",
  },
  {
    id: 7,
    name: "Préstamo Personal",
    concept_type: 3,
    formula: 7,
    description: "Descuento por el reembolso de un préstamo otorgado al empleado.",
  },
  {
    id: 8,
    name: "Vacaciones Pagadas",
    concept_type: 1,
    formula: 8,
    description: "Compensación durante el período de descanso anual del empleado.",
  },
  {
    id: 9,
    name: "Prima de Antigüedad",
    concept_type: 1,
    formula: 9,
    description: "Pago adicional en reconocimiento por años de servicio.",
  },
  {
    id: 10,
    name: "Fondo de Ahorro",
    concept_type: 3,
    formula: 10,
    description: "Aportación voluntaria o fija para ahorro del empleado.",
  },
];

export { conceptSeeds };