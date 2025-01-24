import { WorkingDayInterface } from "../../interfaces";

const workingDaysSeeds: Partial<WorkingDayInterface>[] = [
  {
    id: 1,
    description: "Full-time",
    weekly_hours: 40,
  },
  {
    id: 2,
    description: "Part-time",
    weekly_hours: 20,
  },
  {
    id: 3,
    description: "Freelance",
    weekly_hours: 10,
  },
  {
    id: 4,
    description: "Shift work",
    weekly_hours: 35,
  },
  {
    id: 5,
    description: "Seasonal",
    weekly_hours: 15,
  },
];

export { workingDaysSeeds };