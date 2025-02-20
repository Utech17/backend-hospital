import { ContactInterface } from "../../interfaces";

const contactsSeeds: Partial<ContactInterface>[] = [
  {
    name: "Eliana",
    lastName: "Jiménez",
    phone: "04140000011",
    email: "eliana.jimenez@example.com",
    relationship: "family",
    patient_id: 1,
  },
  {
    name: "Carlos",
    lastName: "Fernández",
    phone: "04140000012",
    email: "carlos.fernandez@example.com",
    relationship: "friend",
    patient_id: 2,
  },
  {
    name: "Adriana",
    lastName: "Rojas",
    phone: "04140000013",
    email: "adriana.rojas@example.com",
    relationship: "colleague",
    patient_id: 3,
  },
  {
    name: "Luis",
    lastName: "Ramírez",
    phone: "04140000014",
    email: "luis.ramirez@example.com",
    relationship: "other",
    patient_id: 4,
  },
  {
    name: "Sara",
    lastName: "Vargas",
    phone: "04140000015",
    email: "sara.vargas@example.com",
    relationship: "family",
    patient_id: 5,
  },
];

export { contactsSeeds };