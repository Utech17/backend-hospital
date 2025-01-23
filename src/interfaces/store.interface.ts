import { DepartmentInterface } from "../interfaces"

export interface StoreInterface{
    id?:number;
    department_id?:number;
    name:string;
    location:string;
    description:string;
}