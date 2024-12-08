import { DataTypes } from "sequelize";

const AttendanceEmployeeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_empleado
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // fecha
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // hora_entrada
  entry_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // hora_salida
  exit_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // horas_trabajadas
  hours_worked: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
};

export { AttendanceEmployeeModel };