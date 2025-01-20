import { DetailPurchaseInterface } from "../../interfaces"; // Import your interface

const detailPurchaseSeeds: Partial<DetailPurchaseInterface>[] = [
  {
    id_compra: 1,
    id_producto: 101,
    cantidad: 2,
    precio_compra: 250.38, // Example: 2 * 125.19 (assuming price per unit)
  },
  {
    id_compra: 1,
    id_producto: 102,
    cantidad: 1,
    precio_compra: 100.00,
  },
    {
    id_compra: 2,
    id_producto: 103,
    cantidad: 3,
    precio_compra: 1500.00, // Example: 3 * 500.00
  },
  {
    id_compra: 3,
    id_producto: 101,
    cantidad: 1,
    precio_compra: 150.25,
  },
  {
    id_compra: 4,
    id_producto: 104,
    cantidad: 2,
    precio_compra: 750.00,
  },
    {
    id_compra: 4,
    id_producto: 102,
    cantidad: 1,
    precio_compra: 100.00,
  },
];

export { detailPurchaseSeeds };