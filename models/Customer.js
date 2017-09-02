module.exports = function(sequelize, DataTypes)
{
    var Customer = sequelize.define("Customer", {
    	
    	cust_nm: {
    	    type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Customer.associate = function(models) {
        // Associating Customer with burgers
        // When a Customer is deleted, also delete any associated Burgers
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };

    return Customer;
};