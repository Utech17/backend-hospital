import { CompraInterface } from "../../interfaces";

const comprasSeeds: Partial<CompraInterface>[] = [  
  {
    id: 1,
    numero_factura: 1,
    fecha: new Date("2024-12-13T00:00:00Z"),
    proveedor_id: 1,
    estado: 'aprobada',
    fechaActualizacion: new Date("2024-12-13T00:00:00Z"),
    fechaEliminacion: null,
  },
  {
    id: 2,
    numero_factura: 2,
    fecha: new Date("2024-12-13T00:00:00Z"),
    proveedor_id: 2,
    estado: 'rechazada',
    fechaActualizacion: new Date("2024-12-13T00:00:00Z"),
    fechaEliminacion: null,
  },
  {
    id: 3,
    numero_factura: 3,
    fecha: new Date("2024-12-13T00:00:00Z"),
    proveedor_id: 3,
    estado: 'aprobada',
    fechaActualizacion: new Date("2024-12-13T00:00:00Z"),
    fechaEliminacion: null,
  },
  {
    id: 4,
    numero_factura: 4,
    fecha: new Date("2024-12-13T00:00:00Z"),
    proveedor_id: 2,
    estado: 'aprobada',
    fechaActualizacion: new Date("2024-12-13T00:00:00Z"),
    fechaEliminacion: null,
  },
];

export { comprasSeeds }; 