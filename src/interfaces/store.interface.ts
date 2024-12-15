import { DepartamentInterface } from "../interfaces"

export interface StoreInterface{
    id?:number;
    id_departament?:number;
    name:string;
    location:string;
    description:string;
    departament?:DepartamentInterface;
}