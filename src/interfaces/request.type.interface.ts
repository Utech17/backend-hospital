import { DepartmentInterface } from "../interfaces";

export interface RequestTypeInterface {
    id?: number | string;
    name: string;
    bot: boolean;
    id_department?: number | string;
    department?: DepartmentInterface;
}