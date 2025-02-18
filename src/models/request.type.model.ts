import { DataTypes } from "sequelize";

const RequestTypeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  bot: {
    type: DataTypes.BOOLEAN,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export {RequestTypeModel};