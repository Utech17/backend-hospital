import { DataTypes } from "sequelize";

const TypeModel = {
  // cod_tipo
  cod_type: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // descripcion_tipo
  description_type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // estado
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
};

export { TypeModel };