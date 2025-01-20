export interface InventoryInterface {
    id?: number | string;
    id_product: number;
    id_organizational_unit: string;
    amount: number;
    status: number;
    batch: string;
    expiration_date: Date;
}