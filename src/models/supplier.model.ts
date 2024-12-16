import { DataTypes } from "sequelize";

const SupplierModel = {
  // id
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // rif
  rif: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  // direccion
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // razon_social
  business_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // status
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export { SupplierModel };