import { BuyDetailsInterface } from "../../interfaces";

const BuyDetailSeeds: Partial<BuyDetailsInterface>[] = [
  {
    buy_id: 1,
    product_id: 1,
    quantity: 2,
    buy_price: 250.38, 
  },
  {
    buy_id: 1,
    product_id: 2,
    quantity: 1,
    buy_price: 100.00,
  },
    {
    buy_id: 2,
    product_id: 3,
    quantity: 3,
    buy_price: 1500.00,
  },
  {
    buy_id: 3,
    product_id: 4,
    quantity: 1,
    buy_price: 150.25,
  },
  {
    buy_id: 4,
    product_id: 5,
    quantity: 2,
    buy_price: 750.00,
  },
    {
    buy_id: 4,
    product_id: 6,
    quantity: 1,
    buy_price: 100.00,
  },
];

export { BuyDetailSeeds };