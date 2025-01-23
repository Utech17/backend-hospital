import { StoreInterface } from "../../interfaces";

const StoreSeeds: Partial<StoreInterface>[] = [
  { 
    department_id: 1, 
    name: 'Almacen Central', 
    location: 'Centro', 
    description: 'Almacen principal en el centro de la ciudad', 
  },
  { 
    department_id: 2,
    name: 'Almacen Norte', 
    location: 'Norte', 
    description: 'Almacen en la zona norte', 
  },
  { 
    department_id: 3,
    name: 'Almacen Sur', 
    location: 'Sur', 
    description: 'Almacen en la zona sur', 
  },
  { 
    department_id: 4,
    name: 'Almacen Este', 
    location: 'Este', 
    description: 'Almacen en la zona Este', 
  },
  { 
    department_id: 5,
    name: 'Almacen Oeste', 
    location: 'Oeste', 
    description: 'Almacen en la zona Oeste', 
  },
];

export {
   StoreSeeds,
 };