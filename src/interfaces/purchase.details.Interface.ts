import { Optional } from "sequelize";
import { ProductInterface } from "./product.interface";
import { BuyInterface } from "./buy.interface";

export interface PurchaseDetailsInterface {
    purchaseId: number;
    productId: number;
    quantity: number;
    purchasePrice: number;
    purchase?:BuyInterface;
    Product?:ProductInterface;
}

export interface PurchaseDetailsCreationInterface
    extends Optional<PurchaseDetailsInterface, 'purchaseId' | 'productId'> {}