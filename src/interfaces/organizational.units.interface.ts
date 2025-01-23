import { DepartmentInterface } from "./department.interface";

export interface OrganizationalUnitsInterface {
    id?: number; 
    units_name: string;
    units_type: string;
    department_id: number;
    location: string; 
    department?:DepartmentInterface;
}