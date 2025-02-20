import { PaymentTypeInterface } from "../../interfaces";

const paymentTypeSeeds: Partial<PaymentTypeInterface>[] = [
  {
    description: "Efectivo",
    status: true,
  },
  {
    description: "Tarjeta de Crédito",
    status: true,
  },
  {
    description: "Transferencia Bancaria",
    status: true,
  },
  {
    description: "Cheque",
    status: false,
  },
  {
    description: "Billetera Digital",
    status: true,
  },
  {
    description: "Pago Móvil",
    status: true,
  },
  {
    description: "Criptomoneda",
    status: false,
  },
  {
    description: "Tarjeta de Débito",
    status: true,
  },
  {
    description: "PayPal",
    status: true,
  },
];

export { paymentTypeSeeds };