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
  organizational_unit_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'organizational_units',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  // status
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
    allowNull: false,
  },
  // id_usuario
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:  true,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
};

export { EmployeeModel };