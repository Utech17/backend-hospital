import { ConceptInterface } from "../../interfaces";

enum concept_t {
  type1 = "type1",
  type2 = "type2",
  type3 = "type3",
}

const conceptSeeds: Partial<ConceptInterface>[] = [
  {
    name: "Sueldo Base",
    concept_type: concept_t.type1,
    formula: 1,
    description: "Compensación fija mensual o quincenal por el trabajo realizado.",
  },
  {
    name: "Horas Extras",
    concept_type: concept_t.type2,
    formula: 2,
    description: "Pago adicional por horas trabajadas fuera del horario regular.",
  },
  {
    name: "Bonificación",
    concept_type: concept_t.type3,
    formula: 3,
    description: "Ingreso extra otorgado por desempeño o logros específicos.",
  },
  {
    name: "Deducción de Impuestos",
    concept_type: concept_t.type1,
    formula: 4,
    description: "Monto reducido por obligaciones fiscales aplicables.",
  },
  {
    name: "Seguro Social",
    concept_type: concept_t.type2,
    formula: 5,
    description: "Contribución obligatoria al sistema de seguridad social.",
  },
  {
    name: "Comisión por Ventas",
    concept_type: concept_t.type3,
    formula: 6,
    description: "Porcentaje ganado basado en las ventas realizadas.",
  },
  {
    name: "Préstamo Personal",
    concept_type: concept_t.type1,
    formula: 7,
    description: "Descuento por el reembolso de un préstamo otorgado al empleado.",
  },
  {
    name: "Vacaciones Pagadas",
    concept_type: concept_t.type2,
    formula: 8,
    description: "Compensación durante el período de descanso anual del empleado.",
  },
  {
    name: "Prima de Antigüedad",
    concept_type: concept_t.type3,
    formula: 9,
    description: "Pago adicional en reconocimiento por años de servicio.",
  },
  {
    name: "Fondo de Ahorro",
    concept_type: concept_t.type1,
    formula: 10,
    description: "Aportación voluntaria o fija para ahorro del empleado.",
  },
];

export { conceptSeeds };