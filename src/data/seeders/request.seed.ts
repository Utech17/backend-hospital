import { RequestInterface } from "../../interfaces";

const requestsSeeds: Partial<RequestInterface>[] = [
  {
    id: 1,
    description: "Purchase of medical supplies",
    id_request_type: 1, 
    amount: 1000,
    status: "approved",
  },
  {
    id: 2,
    description: "Salary payment for medical staff",
    id_request_type: 2,
    amount: 5000,
    status: "approved",
  },
  {
    id: 3,
    description: "Equipment maintenance request",
    id_request_type: 3,
    amount: 1200,
    status: "pending",
  },
  {
    id: 4,
    description: "Purchase of office furniture",
    id_request_type: 1,
    amount: 800,
    status: "rejected",
  },
  {
    id: 5,
    description: "Emergency surgery request",
    id_request_type: 4,
    amount: 7000,
    status: "approved",
  },
  {
    id: 6,
    description: "Training session for staff",
    id_request_type: 5,
    amount: 1500,
    status: "pending",
  },
];

export { requestsSeeds };