import { SupplierInterface } from "../../interfaces";

const supplierSeeds: Partial<SupplierInterface>[] = [
  {
    rif: "J-123456789",
    address: "Av. Principal, Edificio 1",
    business_name: "Farmacia Universal C.A.",
    status: true
  },
  {
    rif: "J-987654321",
    address: "Calle 2, Local 15",
    business_name: "Distribuidora Médica S.A.",
    status: true
  },
  {
    rif: "J-456789123",
    address: "Carrera 10, Galpón 3",
    business_name: "Suministros Hospitalarios C.A.",
    status: true
  }
];

export { supplierSeeds };