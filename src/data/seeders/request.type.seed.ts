import { RequestTypeInterface } from "../../interfaces";

const requestTypesSeeds: Partial<RequestTypeInterface>[] = [
  {
    request_type_id: 1,
    name: "Solicitud de Compra",
    bot: true,
    department_id: 1,
  },
  {
    request_type_id: 2,
    name: "Solicitud de Pago",
    bot: false,
    department_id: 2,
  },
  {
    request_type_id: 3,
    name: "Solicitud de Mantenimiento",
    bot: false,
    department_id: 3,
  },
  {
    request_type_id: 4,
    name: "Solicitud de Emergencia",
    bot: true,
    department_id: 4,
  },
  {
    request_type_id: 5,
    name: "Solicitud de Capacitación",
    bot: false,
    department_id: 5,
  },
];

export { requestTypesSeeds };