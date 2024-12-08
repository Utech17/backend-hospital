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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export { TypeModel };