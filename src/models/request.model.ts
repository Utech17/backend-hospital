import { DataTypes } from "sequelize";

const RequestModel = {
  request_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  request_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
    allowNull: false,
  },
};

export {RequestModel};