import { DataTypes } from 'sequelize';

const OrganizationalUnitsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Nombre de la unidad organizativa
    units_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Tipo de la unidad organizativa
    units_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // ID del departamento al que pertenece la unidad
    id_departament: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Ubicación de la unidad organizativa
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};

export { OrganizationalUnitsModel };