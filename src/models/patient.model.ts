import { DataTypes } from "sequelize";

const PatientModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // apodo
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  // nombre
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // apellido
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // fecha_nacimiento
  birthDate: { 
    type: DataTypes.DATE,
    allowNull: false,
  },
  // sexo
  gender: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  // identificador
  identifier: { 
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  // fecha_registro
  registrationDate: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

export { PatientModel };