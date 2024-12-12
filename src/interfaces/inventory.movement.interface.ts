import { StoreInterface } from "./store.interface";

export interface InventoryMovementInterface {
    id?: number | string;
    warehouse_id: number | string;
    movement_date: Date;
    quantity: number;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
    Store?:StoreInterface;
  }