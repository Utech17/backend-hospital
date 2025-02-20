import { InventoryInterface } from "../../interfaces";

const InventorysSeeds: Partial<InventoryInterface>[] = [
   
  {
    product_id: 1,
    organizational_unit_id: 1,
    amount: 100,
    status: 1,
    batch: "A12345",
    expiration_date: new Date("2023-12-31"),
  },
  {
    product_id: 2,
    organizational_unit_id: 2,
    amount: 50,
    status: 1,
    batch: "B7890",
    expiration_date: new Date("2023-12-31"),
  },
  {
    product_id: 3,
    organizational_unit_id: 3,
    amount: 5,
    status: 1,
    batch: "C1234",
    expiration_date: new Date("2023-12-31"),
  },
  {
    product_id: 4,
    organizational_unit_id: 2,
    amount: 500,
    status: 1,
    batch: "LOT202311",
    expiration_date: new Date("2023-12-31"),
  },

];

export { InventorysSeeds};