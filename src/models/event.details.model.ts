import { DataTypes } from "sequelize";

const EventDetailsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // ID del evento
    events_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // ID de la acción
    actions_id: {
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