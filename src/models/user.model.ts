import { DataTypes } from "sequelize";

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  },
  // Nombre
  firstName: {
    type: DataTypes.STRING(50), 
    allowNull: false, 
  },
  // Apellido
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Correo
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  // Contraseña
  password: {
    type: DataTypes.STRING(400),
    allowNull: false,
  },
  // Estado del usuario (activo/inactivo)
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  // ID del rol asociado al usuario
  role_id: {
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

export { UserModel };