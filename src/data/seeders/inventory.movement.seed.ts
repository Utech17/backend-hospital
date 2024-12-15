import { InventoryMovementInterface } from "../../interfaces";

const inventoryMovementsSeeds: Partial<InventoryMovementInterface>[] = [
  {
    id: 1,
    id_Store: 1,
    movement_date: new Date("2024-01-10"),
    quantity: 50,
    updatedAt: new Date("2024-01-10T15:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    id_Store: 2,
    movement_date: new Date("2024-02-05"),
    quantity: -20,
    updatedAt: new Date("2024-02-05T10:30:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    id_Store: 3,
    movement_date: new Date("2024-03-20"),
    quantity: 30,
    updatedAt: new Date("2024-03-20T12:00:00Z"),
    deletedAt: null,
  },
];

export { inventoryMovementsSeeds };