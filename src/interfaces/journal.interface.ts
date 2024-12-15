import { RequestInterface } from "../interfaces";
import { AccountRecordInterface } from "../interfaces";

export interface JournalInterface {
    id?: number | string;
    request_id?: number | string;
    id_account_record?: number | string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    request?: RequestInterface;
    account_record?: AccountRecordInterface;
}