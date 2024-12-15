import { RoleInterface } from "./role.interface";

export interface UserInterface{
    id?: number | string;
    firstName: string; // nombre
    lastName: string;  // apellido
    email: string;
    password: string;  // contraseña
    createdAt?: Date;  // fecha_creacion
    isActive?: boolean; // status
    roleId: number | string; // id_rol
    role?:RoleInterface;
}