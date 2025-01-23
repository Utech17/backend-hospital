import { RequestInterface } from "../interfaces";
import { AccountRecordInterface } from "../interfaces";

export interface JournalInterface {
    id?: number | string;
    request_id?: number | string;
    account_record_id?: number | string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    request?: RequestInterface;
    account_record?: AccountRecordInterface;
}