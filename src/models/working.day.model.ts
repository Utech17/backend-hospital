import { DataTypes } from 'sequelize';

const WorkingDayModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    //Descripcion
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //horas semanales
    weekly_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};

export { WorkingDayModel };