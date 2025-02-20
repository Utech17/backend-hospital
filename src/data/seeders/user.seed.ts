import { UserInterface } from "../../interfaces";

const usersSeeds: Partial<UserInterface>[] = [
  {
    firstName: "Miguel",
    lastName: "Gurierrez",
    email: "miguel.gurierrez@example.com",
    password: "securePassword123",
    createdAt: new Date("2024-01-01T08:00:00Z"),
    isActive: true,
    role_id: 1,
  },
  {
    firstName: "Jheilyn",
    lastName: "Ramirez",
    email: "jheilyn.ramirez@example.com",
    password: "anotherSecurePassword456",
    createdAt: new Date("2024-02-01T09:00:00Z"),
    isActive: true,
    role_id: 2,
  },
  {
    firstName: "Maikel",
    lastName: "Perez",
    email: "maikel.perez@example.com",
    password: "yetAnotherPassword789",
    createdAt: new Date("2024-03-01T10:00:00Z"),
    isActive: false,
    role_id: 3,
  },
  {
    firstName: "Debora",
    lastName: "Mayurel",
    email: "debora.mayurel@example.com",
    password: "securePasswordDebora",
    createdAt: new Date("2024-04-01T11:00:00Z"),
    isActive: true,
    role_id: 2,
  },
  {
    firstName: "Leticia",
    lastName: "Parra",
    email: "leticia.parra@example.com",
    password: "securePasswordLeticia",
    createdAt: new Date("2024-05-01T12:00:00Z"),
    isActive: true,
    role_id: 1,
  },
];

export { usersSeeds };