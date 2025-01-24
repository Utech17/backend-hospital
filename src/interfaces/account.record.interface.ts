import { AccountInterface } from "../interfaces";

export interface AccountRecordInterface {
    id?: number | string;
    type: "income" | "expense";
    description: string;
    amount: number;
    account_id?: number | string;
    status?: boolean;
    account?: AccountInterface;
}