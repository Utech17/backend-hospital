import { DataTypes } from "sequelize";

const EventTypeModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Nombre del evento
    event_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}

export { EventTypeModel};