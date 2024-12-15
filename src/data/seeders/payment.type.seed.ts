import { PaymentTypeInterface } from "../../interfaces";

const paymentTypeSeeds: Partial<PaymentTypeInterface>[] = [
  {
    paymentTypeCode: 1,
    paymentTypeDescription: "Cash",
    status: true,
  },
  {
    paymentTypeCode: 2,
    paymentTypeDescription: "Credit Card",
    status: true,
  },
  {
    paymentTypeCode: 3,
    paymentTypeDescription: "Bank Transfer",
    status: true,
  },
  {
    paymentTypeCode: 4,
    paymentTypeDescription: "Check",
    status: false,
  },
  {
    paymentTypeCode: 5,
    paymentTypeDescription: "Digital Wallet",
    status: true,
  },
  {
    paymentTypeCode: 6,
    paymentTypeDescription: "Mobile Payment",
    status: true,
  },
  {
    paymentTypeCode: 7,
    paymentTypeDescription: "Cryptocurrency",
    status: false,
  },
  {
    paymentTypeCode: 8,
    paymentTypeDescription: "Debit Card",
    status: true,
  },
  {
    paymentTypeCode: 9,
    paymentTypeDescription: "PayPal",
    status: true,
  },
  {
    paymentTypeCode: 10,
    paymentTypeDescription: "Gift Card",
    status: false,
  },
];

export { paymentTypeSeeds };