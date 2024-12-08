import { StoreInterface } from "./store.interface";

export interface InventoryMovementInterface {
    id?: number | string;
    warehouse_id: number | string;
    movement_date: Date;
    quantity: number;
    Store?:StoreInterface;
  }