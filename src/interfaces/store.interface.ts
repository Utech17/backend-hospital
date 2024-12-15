import { DepartamentInterface } from "./departament.interface"

export interface StoreInterface{
    id?:number;
    id_departament?:number;
    name:string;
    location:string;
    descrption:string;
    departament?:DepartamentInterface;
}