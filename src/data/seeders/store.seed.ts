import { StoreInterface } from "../../interfaces";

const StoreSeeds: Partial<StoreInterface>[] = [
  { 
    id_departament: 1, 
    name: 'Almacen Central', 
    location: 'Centro', 
    description: 'Almacen principal en el centro de la ciudad', 
  },
  { 
    id_departament: 2,
    name: 'Almacen Norte', 
    location: 'Norte', 
    description: 'Almacen en la zona norte', 
  },
  { 
    id_departament: 3,
    name: 'Almacen Sur', 
    location: 'Sur', 
    description: 'Almacen en la zona sur', 
  },
  { 
    id_departament: 4,
    name: 'Almacen Este', 
    location: 'Este', 
    description: 'Almacen en la zona Este', 
  },
  { 
    id_departament: 5,
    name: 'Almacen Oeste', 
    location: 'Oeste', 
    description: 'Almacen en la zona Oeste', 
  },
];

export {
   StoreSeeds,
 };