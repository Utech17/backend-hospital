import { PaymentTypeInterface } from "../../interfaces";

const paymentTypeSeeds: Partial<PaymentTypeInterface>[] = [
  {
    id: 1,
    description: "Cash",
    status: true,
  },
  {
    id: 2,
    description: "Credit Card",
    status: true,
  },
  {
    id: 3,
    description: "Bank Transfer",
    status: true,
  },
  {
    id: 4,
    description: "Check",
    status: false,
  },
  {
    id: 5,
    description: "Digital Wallet",
    status: true,
  },
  {
    id: 6,
    description: "Mobile Payment",
    status: true,
  },
  {
    id: 7,
    description: "Cryptocurrency",
    status: false,
  },
  {
    id: 8,
    description: "Debit Card",
    status: true,
  },
  {
    id: 9,
    description: "PayPal",
    status: true,
  },
  {
    id: 10,
    description: "Gift Card",
    status: false,
  },
];

export { paymentTypeSeeds };