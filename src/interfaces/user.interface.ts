import { RoleInterface } from "../interfaces";

export interface UserInterface{
    id?: number | string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    isActive?: boolean;
    role_id: number | string;
    role?:RoleInterface;
}