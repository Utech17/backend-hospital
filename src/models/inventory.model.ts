import { DataTypes } from 'sequelize';

const InventoryModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    organizational_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'organizational_units',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    batch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
};

export { InventoryModel }; 

