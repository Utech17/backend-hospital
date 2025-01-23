import { RequestInterface } from "../../interfaces";

const requestsSeeds: Partial<RequestInterface>[] = [
  {
    request_id: 1,
    description: "Purchase of medical supplies",
    request_type_id: 1, 
    amount: 1000,
    status: "approved",
  },
  {
    request_id: 2,
    description: "Salary payment for medical staff",
    request_type_id: 2,
    amount: 5000,
    status: "approved",
  },
  {
    request_id: 3,
    description: "Equipment maintenance request",
    request_type_id: 3,
    amount: 1200,
    status: "pending",
  },
  {
    request_id: 4,
    description: "Purchase of office furniture",
    request_type_id: 1,
    amount: 800,
    status: "rejected",
  },
  {
    request_id: 5,
    description: "Emergency surgery request",
    request_type_id: 4,
    amount: 7000,
    status: "approved",
  },
  {
    request_id: 6,
    description: "Training session for staff",
    request_type_id: 5,
    amount: 1500,
    status: "pending",
  },
];

export { requestsSeeds };