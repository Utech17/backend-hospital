import { DataTypes } from "sequelize";

const StoreModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Nombre del almacen
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  // Ubicación
  location: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  // Descripción
  description: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  // ID del departamento al que pertenece
  id_departament: {
    type: DataTypes.INTEGER,
  },
};

export { StoreModel };