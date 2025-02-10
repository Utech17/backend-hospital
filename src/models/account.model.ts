import { DataTypes } from "sequelize";

const AccountModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_account: {
        type: DataTypes.ENUM('A', 'P', 'C', 'I', 'G'), // Activo, Pasivo, Capital, Ingresos, Gastos
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
};

export {
    AccountModel
};