import { Optional } from "sequelize";
import { ProductInterface } from "./product.interface";
import { BuyInterface } from "./buy.interface";

export interface BuyDetailsInterface {
  id: number;
  buy_id: number;
  product_id: number;
  quantity: number;
  buy_price: number;
  Buy?: BuyInterface;
  Product?: ProductInterface;
}

export interface BuyDetailsCreationInterface
    extends Optional<BuyDetailsInterface, 'buy_id' | 'product_id'> {}