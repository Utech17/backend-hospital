import { DataTypes } from "sequelize";

const ContractModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_empleado
  id_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  // id_jornada
  id_workingDay: {
    type: DataTypes.INTEGER,
  },
  // id_cargo
  id_charge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: true,
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
};

export { ContractModel };