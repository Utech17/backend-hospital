import { DataTypes } from "sequelize";

const BuyModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Número de factura
    invoice_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Fecha de la compra
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Monto total
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // ID del proveedor
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Estado de la compra (activo/inactivo)
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
};

export {BuyModel};