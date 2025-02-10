import { DepartmentInterface } from "../../interfaces";


const departmentSeeds: Partial<DepartmentInterface>[] = [
  {
    id: 1,
    department_type: 1, 
    department_name: "Administración",
    description: "Lleva la administración",
  },
  {
    id: 2,
    department_type: 1, 
    department_name: "Laboratorio",
    description: "Procesos de laboratorio",
  },
  {
    id: 3,
    department_type: 1, 
    department_name: "Compras",
    description: "Lleva la compra de insumos e implementos",
  },
  {
    id: 4,
    department_type: 1, 
    department_name: "Emergencias",
    description: "Procesos de emergencias médicas",
  },
  {
    id: 5,
    department_type: 1, 
    department_name: "Farmacia",
    description: "Proceso de farmacia",
  },
  {
    id: 6,
    department_type: 1, 
    department_name: "Pediatría",
    description: "Consultas, operaciones de pediatría",
  },
];

export{
    departmentSeeds
}
