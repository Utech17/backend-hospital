import { InventoryInterface } from "../../interfaces";

const InventorysSeeds: Partial<InventoryInterface>[] = [
   
  {
    id: 1,
    id_product: 1,
    id_organizational_unit: "ALMACEN_CENTRAL",
    amount: 100,
    status: 1,
    batch: "A12345",
    expiration_date: new Date("2023-12-31"),
  },
  {
    id: 2,
    id_product: 2,
    id_organizational_unit: "URGENCIAS",
    amount: 50,
    status: 1,
    batch: "B7890",
    expiration_date: new Date("2023-12-31"),
  },
  {
    id: 3,
    id_product: 3,
    id_organizational_unit: "QUIRÓFANO",
    amount: 5,
    status: 1,
    batch: "C1234",
    expiration_date: new Date("2023-12-31"),
  },

  {
    id: 4,
    id_product: 4,
    id_organizational_unit: "ALMACEN_GENERAL",
    amount: 500,
    status: 1,
    batch: "LOT202311",
    expiration_date: new Date("2023-12-31"),
  },

];

export {
    InventorysSeeds
}