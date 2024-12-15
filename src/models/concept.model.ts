import { DataTypes } from "sequelize";

const ConceptModel = {
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
  // tipo de concepto
  concept_type: {
    type: DataTypes.ENUM("type1", "type2", "type3"), 
    allowNull: false,
  },
  // fórmula
  formula: {
    type: DataTypes.DECIMAL(10, 2),
  },
  // descripción
  description: {
    type: DataTypes.TEXT,
  },
};

export { ConceptModel };
