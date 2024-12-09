import { DataTypes } from "sequelize";

const PayrollModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //id_empleado 
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  //fecha_inicio 
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
  },
  //fecha_fin 
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  //salario_bruto 
  grossSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  //deducciones 
  deductions: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  //salario_neto 
  netSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
};

export { PayrollModel };