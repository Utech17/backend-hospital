import { DataTypes } from "sequelize";

const ChargeModel = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Nombre del cargo
    charge_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    // Descripción
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  };
  
  export { ChargeModel };