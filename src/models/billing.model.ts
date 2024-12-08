import { DataTypes } from "sequelize";

const BillingModel = {
  num_fact: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // id_paciente
  patient_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // fecha_factura
  billing_date: { 
    type: DataTypes.DATE,
    allowNull: false,
  }, 
  // estado_factura
  billing_status: {
    type: DataTypes.ENUM("pending", "paid", "cancelled"),
    allowNull: false,
  },
  client_id: { // id_clientes
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export { BillingModel };