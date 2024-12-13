import { DataTypes } from "sequelize";

const EmployeeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // numero_telefono
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  // direccion_casa
  home_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  // codigo_postal
  postal_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // id_unidad
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // status
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  // id_usuario
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
};

export { EmployeeModel };