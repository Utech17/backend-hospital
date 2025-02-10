import { RequestInterface } from "../../interfaces";

const requestsSeeds: Partial<RequestInterface>[] = [
  {
    request_id: 1,
    description: "Compra de suministros médicos",
    request_type_id: 1, 
    amount: 1000,
    status: "approved",
  },
  {
    request_id: 2,
    description: "Pago de salarios para el personal médico",
    request_type_id: 2,
    amount: 5000,
    status: "approved",
  },
  {
    request_id: 3,
    description: "Solicitud de mantenimiento de equipos",
    request_type_id: 3,
    amount: 1200,
    status: "pending",
  },
  {
    request_id: 4,
    description: "Compra de muebles de oficina",
    request_type_id: 1,
    amount: 800,
    status: "rejected",
  },
  {
    request_id: 5,
    description: "Solicitud de cirugía de emergencia",
    request_type_id: 4,
    amount: 7000,
    status: "approved",
  },
  {
    request_id: 6,
    description: "Sesión de entrenamiento para el personal",
    request_type_id: 5,
    amount: 1500,
    status: "pending",
  },
];

export { requestsSeeds };