import { RequestInterface } from "../interfaces";
import { AccountRecordInterface } from "../interfaces";

export interface JournalInterface {
  id?: number;
  request_id: number;
  account_record_id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt?: Date | null;
  request?: RequestInterface;
  account_record?: AccountRecordInterface;
}