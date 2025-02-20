import { RoleInterface } from "../../interfaces";

const rolesSeeds: Partial<RoleInterface>[] = [
  {
    name: "Administrador",
    description: "Administrador principal del sistema con acceso a todas sus funciones",
  },
  {
    name: "Avanzado",
    description: "Encargado de gestionar el departamento correspondiente",
  }, 
  {
    name: "Básico",
    description: "Colaborador con acceso limitado a funciones concretas",
  },
  {
    name: "Invitado",
    description: "Acceso temporal al sistema con funciones muy limitadas",
  },
];

export { rolesSeeds }