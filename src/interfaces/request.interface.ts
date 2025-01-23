import { RequestTypeInterface } from "../interfaces";

export interface RequestInterface {
    request_id?: number | string;
    description: string;
    request_type_id?: number | string;
    amount: number;
    status: "pending" | "approved" | "rejected";
}