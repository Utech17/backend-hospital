import { DataTypes } from "sequelize";

const ClientModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  // número de teléfono
  phone_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
};

export { ClientModel };