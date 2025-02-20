import { DepartmentInterface } from "../../interfaces";


const departmentSeeds: Partial<DepartmentInterface>[] = [
  {
    department_type: 1, 
    department_name: "Administración",
    description: "Lleva la administración",
  },
  {
    department_type: 1, 
    department_name: "Laboratorio",
    description: "Procesos de laboratorio",
  },
  {
    department_type: 1, 
    department_name: "Compras",
    description: "Lleva la compra de insumos e implementos",
  },
  {
    department_type: 1, 
    department_name: "Emergencias",
    description: "Procesos de emergencias médicas",
  },
  {
    department_type: 1, 
    department_name: "Farmacia",
    description: "Proceso de farmacia",
  },
  {
    department_type: 1, 
    department_name: "Pediatría",
    description: "Consultas, operaciones de pediatría",
  },
];

export{
    departmentSeeds
}
