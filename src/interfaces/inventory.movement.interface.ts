import { StoreInterface } from "./store.interface";

export interface InventoryMovementInterface {
    id?: number | string;
    store_id: number | string;
    movement_date: Date;
    quantity: number;
    updatedAt:Date;
    deletedAt?: string | Date | null;
  }