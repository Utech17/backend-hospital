import { DataTypes } from "sequelize";

const PayrollDetailModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_concepto
  concept_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // id_nomina
  payroll_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // monto
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
};

export { PayrollDetailModel };