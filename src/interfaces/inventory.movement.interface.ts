import { StoreInterface } from "./store.interface";

export interface InventoryMovementInterface {
    id?: number | string;
    id_Store: number | string;
    movement_date: Date;
    quantity: number;
    updatedAt:Date;
    deletedAt?: string | Date | null;
    Store?:StoreInterface;
  }