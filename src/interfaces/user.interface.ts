import { RoleInterface } from "./role.interface";
export interface UserInterface{
    id?:number|string;
    name:string;
    email:string;
    password:string;
    role_id?:number |string;
    status?:boolean;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
    role?:RoleInterface;
}