import { DataTypes } from "sequelize";

const ClientModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  // nombre
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // apellido
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // correo electrónico
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  // número de teléfono
  phone_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull:  true,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
};

export { ClientModel };