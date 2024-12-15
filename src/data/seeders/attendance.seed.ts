import { AttendanceInterface } from "../../interfaces";

const attendanceSeeds: Partial<AttendanceInterface>[] = [
  {
    id: 1,
    employee_id: 1,
    date: new Date("2024-12-01"),
    entry_time: new Date("2024-12-01T08:00:00"),
    exit_time: new Date("2024-12-01T16:00:00"),
    hours_worked: 8,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    employee_id: 2,
    date: new Date("2024-12-02"),
    entry_time: new Date("2024-12-02T09:00:00"),
    exit_time: new Date("2024-12-02T17:00:00"),
    hours_worked: 8,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    employee_id: 3,
    date: new Date("2024-12-03"),
    entry_time: new Date("2024-12-03T07:30:00"),
    exit_time: new Date("2024-12-03T15:30:00"),
    hours_worked: 8,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 4,
    employee_id: 4,
    date: new Date("2024-12-04"),
    entry_time: new Date("2024-12-04T08:15:00"),
    exit_time: new Date("2024-12-04T16:15:00"),
    hours_worked: 8,
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 5,
    employee_id: 5, 
    date: new Date("2024-12-05"),
    entry_time: new Date("2024-12-05T09:30:00"),
    exit_time: new Date("2024-12-05T17:30:00"),
    hours_worked: 8,
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export { attendanceSeeds };