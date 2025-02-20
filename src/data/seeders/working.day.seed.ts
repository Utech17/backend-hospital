import { WorkingDayInterface } from "../../interfaces";

const workingDaysSeeds: Partial<WorkingDayInterface>[] = [
  {
    description: "Full-time",
    weekly_hours: 40,
  },
  {
    description: "Part-time",
    weekly_hours: 20,
  },
  {
    description: "Freelance",
    weekly_hours: 10,
  },
  {
    description: "Shift work",
    weekly_hours: 35,
  },
  {
    description: "Seasonal",
    weekly_hours: 15,
  },
];

export { workingDaysSeeds };