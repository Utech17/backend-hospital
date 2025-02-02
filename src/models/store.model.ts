import { DataTypes } from "sequelize";

const StoreModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Nombre del almacen
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Ubicación
  location: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Descripción
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // ID del departamento al que pertenece
  department_id: {
    type: DataTypes.INTEGER,
  },
};

export { StoreModel };