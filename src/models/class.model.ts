import { DataTypes } from "sequelize";

const ClassModel= {
  cod_class: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Descripción de la clase
  des_class: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 
};

export { ClassModel };