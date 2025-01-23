import { DataTypes } from "sequelize";

const EventModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // id_historia_medica
    history_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // id_tipo_evento
    type_events_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // fecha_evento
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // id_empleado
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // resultados
    results: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
};

export { EventModel };