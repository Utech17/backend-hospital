import { DataTypes } from "sequelize";

const ClassModel= {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Descripción de la clase
  des_clase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 
};

export { ClassModel };