import { DataTypes } from "sequelize";

const ActionModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    //Nombre de la acción
    name_actions: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    // Descripción
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
}

export {ActionModel};