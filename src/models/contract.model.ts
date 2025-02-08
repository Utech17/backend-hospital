import { DataTypes } from "sequelize";

const ContractModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_empleado
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  // id_jornada
  working_day_id: {
    type: DataTypes.INTEGER,
  },
  // id_cargo
  charge_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // fecha_inicio
  start_date: {
    type: DataTypes.DATE,
  },
  // fecha_fin
  end_date: {
    type: DataTypes.DATE,
  },
  // salario_base
  base_salary: {
    type: DataTypes.DECIMAL(10, 2),
  },
  // beneficios
  benefits: {
    type: DataTypes.STRING(100),
        allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
};

export { ContractModel };