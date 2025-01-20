import { DataTypes } from 'sequelize';

const InventoryModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
   
    id_product: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
 
    id_organizational_unit: {
        type: DataTypes.STRING,
        allowNull: false,

        
    },

    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,


        
    },

    status: {
        type: DataTypes.NUMBER,
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

