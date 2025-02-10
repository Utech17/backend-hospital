import { DataTypes } from "sequelize";

const PayrollModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //id_empleado 
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //fecha_inicio 
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
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
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
},
};

export { PayrollModel };