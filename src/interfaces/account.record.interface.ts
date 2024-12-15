import { AccountInterface } from "../interfaces";

export interface AccountRecordInterface {
    id?: number | string;
    type: "income" | "expense";
    description: string;
    amount: number;
    id_account?: number | string;
    status?: boolean;
    account?: AccountInterface;
}