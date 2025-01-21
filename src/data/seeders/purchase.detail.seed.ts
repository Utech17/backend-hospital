import { PurchaseDetailsInterface } from "../../interfaces";

const detailPurchaseSeeds: Partial<PurchaseDetailsInterface>[] = [
  {
    purchaseId: 1,
    productId: 101,
    quantity: 2,
    purchasePrice: 250.38, // Example: 2 * 125.19 (assuming price per unit)
  },
  {
    purchaseId: 1,
    productId: 102,
    quantity: 1,
    purchasePrice: 100.00,
  },
    {
    purchaseId: 2,
    productId: 103,
    quantity: 3,
    purchasePrice: 1500.00, // Example: 3 * 500.00
  },
  {
    purchaseId: 3,
    productId: 101,
    quantity: 1,
    purchasePrice: 150.25,
  },
  {
    purchaseId: 4,
    productId: 104,
    quantity: 2,
    purchasePrice: 750.00,
  },
    {
    purchaseId: 4,
    productId: 102,
    quantity: 1,
    purchasePrice: 100.00,
  },
];

export { detailPurchaseSeeds };