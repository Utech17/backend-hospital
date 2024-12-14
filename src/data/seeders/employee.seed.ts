import { EmployeeInterface } from "../../interfaces";

const employeesSeeds: Partial<EmployeeInterface>[] = [
  {
    id: 1,
    phone_number: "04141234567",
    home_address: "Av. Los Próceres, Caracas, Venezuela",
    postal_code: "1010",
    unit_id: 1,
    status: true,
    user_id: 1,
    createdAt: new Date("2024-01-01T08:00:00Z"),
    updatedAt: new Date("2024-01-15T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: 2,
    phone_number: "04161112233",
    home_address: "Calle El Sol, Valencia, Venezuela",
    postal_code: "2001",
    unit_id: 2,
    status: true,
    user_id: 2,
    createdAt: new Date("2024-01-10T09:00:00Z"),
    updatedAt: new Date("2024-01-20T14:30:00Z"),
    deletedAt: null,
  },
  {
    id: 3,
    phone_number: "04241234456",
    home_address: "Urbanización La Lagunita, Maracaibo, Venezuela",
    postal_code: "4002",
    unit_id: 3,
    status: false,
    user_id: 3,
    createdAt: new Date("2024-02-01T07:30:00Z"),
    updatedAt: new Date("2024-02-10T11:45:00Z"),
    deletedAt: new Date("2024-03-01T12:00:00Z"), 
  },
];

export { employeesSeeds };