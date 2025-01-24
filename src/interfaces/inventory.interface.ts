import { ProductInterface } from "./product.interface";
import { OrganizationalUnitsInterface } from "./organizational.units.interface";

export interface InventoryInterface {
    id?: number;
    product_id: number;
    organizational_unit_id: number;
    amount: number;
    status: number;
    batch: string;
    expiration_date: Date;
    product?:ProductInterface;
    organizational_units?:OrganizationalUnitsInterface;
}