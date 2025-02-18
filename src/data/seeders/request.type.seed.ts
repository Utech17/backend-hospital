import { RequestTypeInterface } from "../../interfaces";

const requestTypesSeeds: Partial<RequestTypeInterface>[] = [
  {
    id: 1,
    name: "Solicitud de Compra",
    bot: true,
  },
  {
    id: 2,
    name: "Solicitud de Pago",
    bot: false,
  },
  {
    id: 3,
    name: "Solicitud de Mantenimiento",
    bot: false,
  },
  {
    id: 4,
    name: "Solicitud de Emergencia",
    bot: true,
  },
  {
    id: 5,
    name: "Solicitud de Capacitación",
    bot: false,
  },
];

export { requestTypesSeeds };