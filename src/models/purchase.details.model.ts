import { DataTypes } from "sequelize";

const PurchaseDetailsModel = {
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  // ID del producto
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Cantidad
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Precio de compra
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
};

export { PurchaseDetailsModel };