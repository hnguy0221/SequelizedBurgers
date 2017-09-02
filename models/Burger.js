module.exports = function(sequelize, DataTypes)
{
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Burger.associate = function(models) {
        // We're saying that a Burger should belong to an Customer
        // A Burger can't be created without a customer due to the foreign key constraint
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Burger;
}
