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
    defaultValue: DataTypes.NOW,
  }, 
  // estado_factura
  billing_status: {
    type: DataTypes.ENUM("pendiente", "pagado", "cancelado"),
    allowNull: false,
    defaultValue: "pagado",
  },
  // id_clientes
  client_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
   },
};

export { BillingModel };