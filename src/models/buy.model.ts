import { DataTypes } from "sequelize";

const BuyModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Número de factura
  invoice_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Fecha de la compra
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // ID del proveedor
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Estado de la compra (pendiente/abrobada/rechazada')
  status: {
    type: DataTypes.ENUM("pendiente", "aprobada", "rechazada"),
    allowNull: false,
    defaultValue: "pendiente",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
};

export {BuyModel};