import { DataTypes } from 'sequelize';

const RoleModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    //nombre
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //descripcion
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

export { RoleModel };