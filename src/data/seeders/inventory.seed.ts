import { InventoryInterface } from "../../interfaces";


const InventorysSeeds: Partial<InventoryInterface>[] = [

   
  {
    "id": 1,
    "id_product": 123,
    "id_organizational_unit": "ALMACEN_CENTRAL",
    "amount": 100,
    "status": 1,
    "batch": "A12345",
    "expiration_date": "2024-12-31"
  },
  {
    "id": 2,
    "id_product": 456,
    "id_organizational_unit": "URGENCIAS",
    "amount": 50,
    "status": 1,
    "batch": "B7890",
    "expiration_date": "2025-06-30"
  },
  {
    "id": 3,
    "id_product": 789,
    "id_organizational_unit": "QUIRÓFANO",
    "amount": 5,
    "status": 1,
    "batch": "C1234",
    "expiration_date": "2023-12-15"
  },

  {
    "id": 4,
    "id_product": 1011,
    "id_organizational_unit": "ALMACEN_GENERAL",
    "amount": 500,
    "status": 1,
    "batch": "LOT202311",
    "expiration_date": "2025-03-31"
  },

  {
    "id": 5,
    "id_product": 1234,
    "id_organizational_unit": "UNIDAD_COVID",
    "amount": 20,
    "status": 2,
    "batch": "COVID19_A",
    "expiration_date": "2024-09-30"
  },

  {
    "id": 6,
    "id_product": 5678,
    "id_organizational_unit": "ALMACEN_OBSOLETO",
    "amount": 0,
    "status": 3,
    "batch": "B123",
    "expiration_date": "2022-11-20"
  },

  {
    "id": 7,
    "id_product": 9101,
    "id_organizational_unit": "FARMACIA",
    "amount": 0,
    "status": 4, 
    "batch": "PEDIDO_123",
    "expiration_date": "2024-06-15"
  }

];

export {
    InventorysSeeds
}