import { DataTypes } from "sequelize";

const ContactModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // nombre
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    // apellido
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    // teléfono
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    // correo electrónico
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    // relación
    relationship: {
        type: DataTypes.ENUM("family", "friend", "colleague", "other"),
        allowNull: false,
    },
    // id_pacientes
    id_patients: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
};

export { ContactModel };