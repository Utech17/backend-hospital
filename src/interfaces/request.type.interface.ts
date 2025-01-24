import { DepartmentInterface } from "../interfaces";

export interface RequestTypeInterface {
    request_type_id?: number | string;
    name: string;
    bot: boolean;
    department_id?: number | string;
}