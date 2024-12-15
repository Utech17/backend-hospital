import { DataTypes } from "sequelize";

const PaymentTypeModel = {
  paymentTypeCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  paymentTypeDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}

export { PaymentTypeModel };