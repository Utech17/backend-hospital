import { OrganizationalUnitsInterface } from "../../interfaces";

const organizationalUnitsInterface: Partial<OrganizationalUnitsInterface>[] = [
   {   
    id:"1",
    units_name: "Material de oficina",
    units_type: "Consumo administrativo",
    id_departament: 1,
    location: "Almacen 1",
},
    {   
    id:"2",
    units_name: "Insumos Laboratorio",
    units_type: "Materiales de laboratorio",
    id_departament: 2,
    location:  "Almacen 2",
}, 
    {   
    id:"3",
    units_name: "Inventario compras",
    units_type: "Mercancia",
    id_departament: 3,
    location: "Almacen 3",
},
];

export {organizationalUnitsInterface};