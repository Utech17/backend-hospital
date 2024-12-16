import { SupplierInterface } from "../../interfaces";

const suppliersSeeds: Partial<SupplierInterface>[] = [
  {
    id: 1,
    rif: "J-12345678-9",
    address: "123 Main Street, Barquisimeto, Venezuela",
    business_name: "Distribuidora La Estrella",
    status: true,
    updatedAt: new Date("2024-01-10T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    rif: "J-98765432-1",
    address: "456 Market Avenue, Caracas, Venezuela",
    business_name: "Insumos y Materiales C.A.",
    status: true,
    updatedAt: new Date("2024-02-15T09:15:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    rif: "J-56789012-3",
    address: "789 Industrial Zone, Maracaibo, Venezuela",
    business_name: "Proveedores Unidos S.A.",
    status: false,
    updatedAt: new Date("2024-03-05T14:00:00Z"),
    deletedAt: null,
  },
];

export { suppliersSeeds };