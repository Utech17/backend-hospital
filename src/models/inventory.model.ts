import { DataTypes } from 'sequelize';

const InventoryModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
   
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
 
    id_organizational_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,

        
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

