import { DataTypes } from "sequelize";

const AppointmentModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_paciente
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // id_empleado
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // fecha_cita
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // estado_cita
  appointment_status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
    allowNull: false,
  },
  // area_cita
  appointment_area: {
    type: DataTypes.ENUM('General', 'Specialty', 'Emergency'),
    allowNull: false,
  },
};

export { AppointmentModel };