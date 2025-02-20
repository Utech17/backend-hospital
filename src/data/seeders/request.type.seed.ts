import { RequestTypeInterface } from "../../interfaces";

const requestTypesSeeds: Partial<RequestTypeInterface>[] = [
  {
    name: "Solicitud de Compra",
    bot: true,
  },
  {
    name: "Solicitud de Pago",
    bot: false,
  },
  {
    name: "Solicitud de Mantenimiento",
    bot: false,
  },
  {
    name: "Solicitud de Emergencia",
    bot: true,
  },
  {
    name: "Solicitud de Capacitación",
    bot: false,
  },
];

export { requestTypesSeeds };