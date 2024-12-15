import { RequestTypeInterface } from "../../interfaces";

const requestTypesSeeds: Partial<RequestTypeInterface>[] = [
  {
    id: 1,
    name: "Purchase Request",
    bot: true,
    id_department: 1,
  },
  {
    id: 2,
    name: "Payment Request",
    bot: false,
    id_department: 2,
  },
  {
    id: 3,
    name: "Maintenance Request",
    bot: false,
    id_department: 3,
  },
  {
    id: 4,
    name: "Emergency Request",
    bot: true,
    id_department: 4,
  },
  {
    id: 5,
    name: "Training Request",
    bot: false,
    id_department: 5,
  },
];

export { requestTypesSeeds };