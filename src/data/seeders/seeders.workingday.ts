import { WorkingDayDB } from "../config";
import { WorkingDayModel } from "../models"; // Asegúrate de tener tu modelo importado.

const workingDaySeed = [
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
];

const seedWorkingDays = async () => {
  try {
    // Elimina cualquier dato previo si es necesario
    await WorkingDayDB.bulkCreate(workingDaySeed, {
      updateOnDuplicate: ["description", "weekly_hours"],
    });

    console.log("Working days seeded successfully!");
  } catch (error) {
    console.error("Error seeding working days: ", error);
  }
};

seedWorkingDays();
