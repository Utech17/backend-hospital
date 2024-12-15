import { DataTypes } from "sequelize";

const MedicalHistoryModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  //id_paciente 
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //fecha_ingreso 
  admission_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  //fecha_salida 
  discharge_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  //diagnostico 
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  //tratamiento 
  treatment: {
    type: DataTypes.TEXT,
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

export { MedicalHistoryModel };