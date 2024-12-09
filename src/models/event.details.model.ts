import { DataTypes } from "sequelize";

const EventDetailsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // ID del evento
    id_events: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // ID de la acción
    id_actions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Valor del detalle
    value_detail: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}

export { EventDetailsModel};