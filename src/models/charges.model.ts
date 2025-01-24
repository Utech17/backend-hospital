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
  };
  
  export { ChargeModel };