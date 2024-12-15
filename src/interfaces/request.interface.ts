import { RequestTypeInterface } from "../interfaces";

export interface RequestInterface {
    id?: number | string;
    description: string;
    id_request_type?: number | string;
    amount: number;
    status: "pending" | "approved" | "rejected";
    request_type?: RequestTypeInterface;
}