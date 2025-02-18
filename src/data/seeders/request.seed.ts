import { RequestInterface } from "../../interfaces";

const requestsSeeds: Partial<RequestInterface>[] = [
  // Activos
  {
    request_id: 1,
    description: "Registro de activos iniciales",
    request_type_id: 1,
    amount: 1132000.00,
    status: "aprobada"
  },
  // Pasivos
  {
    request_id: 2,
    description: "Registro de pasivos iniciales",
    request_type_id: 1,
    amount: 546750.00,
    status: "aprobada"
  },
  // Capital
  {
    request_id: 3,
    description: "Registro de capital inicial",
    request_type_id: 1,
    amount: 400000.00,
    status: "aprobada"
  },
  // Ventas y costo de ventas
  {
    request_id: 4,
    description: "Registro de ventas del período",
    request_type_id: 2,
    amount: 400000.00,
    status: "aprobada"
  },
  {
    request_id: 5,
    description: "Registro de costo de ventas",
    request_type_id: 2,
    amount: 170000.00,
    status: "aprobada"
  },
  // Gastos operativos
  {
    request_id: 6,
    description: "Registro de gastos operativos",
    request_type_id: 2,
    amount: 98750.00,
    status: "aprobada"
  },
  // Otros ingresos
  {
    request_id: 7,
    description: "Registro de otros ingresos",
    request_type_id: 2,
    amount: 500.00,
    status: "aprobada"
  },
  // Resultados
  {
    request_id: 8,
    description: "Registro de utilidad del ejercicio",
    request_type_id: 2,
    amount: 131750.00,
    status: "aprobada"
  },
  {
    request_id: 9,
    description: "Registro de reserva legal",
    request_type_id: 2,
    amount: 53500.00,
    status: "aprobada"
  }
];

export { requestsSeeds };