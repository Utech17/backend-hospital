import { DataTypes } from "sequelize";

const PresentationModel = {
  cod_pres: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // cantidad
  quantity: {
    type: DataTypes.STRING(20), 
    allowNull: false,
  },
  // medida
  unit: {
    type: DataTypes.STRING(20), 
    allowNull: false,
  },
  // peso
  weight: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  // estado
  status: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export { PresentationModel };