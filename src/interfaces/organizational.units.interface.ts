import { DepartamentInterface } from "./departament.interface";

export interface OrganizationalUnitsInterface {
    id?: number | string; 
    units_name: string;
    units_type: string;
    id_departament: number;
    location: string; 
    Departament?:DepartamentInterface;
}