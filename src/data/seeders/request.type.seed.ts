import { RequestTypeInterface } from "../../interfaces";

const requestTypesSeeds: Partial<RequestTypeInterface>[] = [
  {
    request_type_id: 1,
    name: "Buy Request",
    bot: true,
    department_id: 1,
  },
  {
    request_type_id: 2,
    name: "Payment Request",
    bot: false,
    department_id: 2,
  },
  {
    request_type_id: 3,
    name: "Maintenance Request",
    bot: false,
    department_id: 3,
  },
  {
    request_type_id: 4,
    name: "Emergency Request",
    bot: true,
    department_id: 4,
  },
  {
    request_type_id: 5,
    name: "Training Request",
    bot: false,
    department_id: 5,
  },
];

export { requestTypesSeeds };