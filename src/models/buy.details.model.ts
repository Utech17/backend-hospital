import { DataTypes } from "sequelize";

const buyDetailsModel = {
  buy_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  // ID del producto
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Cantidad
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Precio de compra
  buy_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
};

export { buyDetailsModel };