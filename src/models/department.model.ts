import { DataTypes } from "sequelize";

const DepartmentModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Tipo de departamento
  department_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Nombre del departamento
  department_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  // Descripción
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
};

export { DepartmentModel };