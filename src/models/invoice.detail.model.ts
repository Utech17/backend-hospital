import { DataTypes } from "sequelize";

const InvoiceDetailModel = {
  // num_detalle
  id: {
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
  id_product: {
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

export { InvoiceDetailModel };