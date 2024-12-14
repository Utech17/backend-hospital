import { DataTypes } from "sequelize";

const InventoryMovementModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //id_almacen 
  id_Store: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //fecha_movimiento 
  movement_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  //cantidad 
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export { InventoryMovementModel };