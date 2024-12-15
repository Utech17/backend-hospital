import { DataTypes } from "sequelize";

const ProductModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Nombre del producto
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: false,
  },
  // Descripción del producto
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: false,
  },
  // Unidad de medida
  unit_measure: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: false,
  },
  // Cantidad por unidad
  quantity_xunit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Peso del producto
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Ubicación del producto
  location: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: false,
  },
  // Estado del producto (activo o inactivo)
  status: {
    type: DataTypes.ENUM("active","inactive"),
    defaultValue: "active",
  },
  // ID del tipo de producto
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // ID de la clase del producto
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // ID de la presentación del producto
  pres_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export { ProductModel };