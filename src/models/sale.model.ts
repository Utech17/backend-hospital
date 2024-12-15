import { DataTypes } from "sequelize";

const SaleModel = {
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
    // Fecha de la venta
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Monto de la venta
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // Código del tipo de pago
    payment_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Estado de la venta (activo o inactivo)
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

export { SaleModel };