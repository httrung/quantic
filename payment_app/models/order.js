module.exports = function(sequelize, DataTypes) {
    return sequelize.define('order', { 
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true
        },    
        state_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        }
    });
};
