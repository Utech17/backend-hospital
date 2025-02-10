import { DataTypes } from "sequelize";

const InventoryMovementModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //id_almacen 
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //fecha_movimiento 
  movement_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  //cantidad 
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:  true,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
   },
};

export { InventoryMovementModel };