import { AccountInterface } from "../interfaces";

export interface AccountRecordInterface {
    id?: number;
    type: "D" | "H"; // Debe, Haber
    description: string;
    amount: number;
    account_id?: number;
    status?: boolean;
    account?: AccountInterface;
}