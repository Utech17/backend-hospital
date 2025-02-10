import { DataTypes } from "sequelize";

const BillingDetailModel = {
  // num_detalle
  billing_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // cantidad
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // precio
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // numero_factura
  num_fact: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // producto_id
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
   },
};

export { BillingDetailModel };