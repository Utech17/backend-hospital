import { RoleInterface } from "../../interfaces";

const rolesSeeds: Partial<RoleInterface>[] = [
    {
        id: 1,
        name: "Administrador",
        description: "Administrador principal del sistema con acceso a todas sus funciones",
    },
    {
        id: 2,
        name: "Avanzado",
        description: "Encargado de gestionar el departamento correspondiente",
    }, 
    {
        id: 3,
        name: "Básico",
        description: "Colaborador con acceso limitado a funciones concretas",
    },
    {
        id: 4,
        name: "Invitado",
        description: "Acceso temporal al sistema con funciones muy limitadas",
    },

];

export { rolesSeeds }