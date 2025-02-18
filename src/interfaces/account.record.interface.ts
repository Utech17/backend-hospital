import { AccountInterface } from "../interfaces";

export interface AccountRecordInterface {
  id?: number;
  type: "debe" | "haber";
  name: string;
  description: string;
  amount: number;
  account_id: number;
  status?: boolean;
  account?: AccountInterface;
}