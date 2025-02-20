import { OrganizationalUnitsInterface } from "../../interfaces";

const organizationalUnitsInterface: Partial<OrganizationalUnitsInterface>[] = [
   {   
    units_name: "Material de oficina",
    units_type: "Consumo administrativo",
    department_id: 1,
    location: "Almacen 1",
    },
    {   
    units_name: "Insumos Laboratorio",
    units_type: "Materiales de laboratorio",
    department_id: 2,
    location:  "Almacen 2",
    }, 
    {   
    units_name: "Inventario compras",
    units_type: "Mercancia",
    department_id: 3,
    location: "Almacen 3",
    },
];

export {organizationalUnitsInterface};