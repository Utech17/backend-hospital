import { ProductInterface } from "./product.interface";
import { OrganizationalUnitsInterface } from "./organizational.units.interface";

export interface InventoryInterface {
    id?: number | string;
    id_product: number;
    id_organizational_unit: string;
    amount: number;
    status: number;
    batch: string;
    expiration_date: Date;
    product?:ProductInterface;
    organizational_units?:OrganizationalUnitsInterface;
}