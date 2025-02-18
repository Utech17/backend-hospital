import { PaymentTypeInterface } from "../../interfaces";

const paymentTypeSeeds: Partial<PaymentTypeInterface>[] = [
  {
    id: 1,
    description: "Efectivo",
    status: true,
  },
  {
    id: 2,
    description: "Tarjeta de Crédito",
    status: true,
  },
  {
    id: 3,
    description: "Transferencia Bancaria",
    status: true,
  },
  {
    id: 4,
    description: "Cheque",
    status: false,
  },
  {
    id: 5,
    description: "Billetera Digital",
    status: true,
  },
  {
    id: 6,
    description: "Pago Móvil",
    status: true,
  },
  {
    id: 7,
    description: "Criptomoneda",
    status: false,
  },
  {
    id: 8,
    description: "Tarjeta de Débito",
    status: true,
  },
  {
    id: 9,
    description: "PayPal",
    status: true,
  },
];

export { paymentTypeSeeds };