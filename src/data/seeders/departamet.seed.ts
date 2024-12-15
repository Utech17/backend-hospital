import { DepartamentInterface } from "../../interfaces";


const departamentSeeds: Partial<DepartamentInterface>[] = [
    {
        id:1,
        department_type: 1, 
        department_name:"Administración",
        description:"lleva la administración",
      },
      {
        id:2,
        department_type: 1, 
        department_name:"Laboratorio",
        description:"procesos de labortorio",
      },
      {
        id:3,
        department_type: 1, 
        department_name:"Compras",
        description:"lleva la compa de insumos e implementos",
      },
      {
        id:4,
        department_type: 1, 
        department_name:"emergencias",
        description:"procesos de emergencias medicas",
      },
      {
        id:5,
        department_type: 1, 
        department_name:"farmacia",
        description:"Proceso de farmacia",
      },
      {
        id:6,
        department_type: 1, 
        department_name:"Pediatria",
        description:"Consultas, operaciones de pediatria",
      },
    ];

export{
    departamentSeeds
}
