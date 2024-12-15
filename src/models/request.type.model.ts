import { DataTypes } from "sequelize";

const RequestTypeModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};

export {
    RequestTypeModel
};