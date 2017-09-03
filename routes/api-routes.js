// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {

    // GET route for getting all of the burgers
    app.get("/", function(req, res) 
    {
        // findAll returns all entries for a table when used with no options
        db.Burger.findAll({order: [['burger_name', 'ASC']]}).then(function(burger_data) {
            // We have access to the burgers as an argument inside of the callback function
            //res.json(burger_data);
            console.log(burger_data);
            res.render("index", {burger_data});
        });
    });

    // PUT route for updating burger. We can get the updated burger 
    // and customer data from req.body
    app.put("/burgers/update", function(req, res) 
    {
        var customer_name = req.body.customer_name.trim();
        console.log("customer_name: '" + customer_name + "'");
        var burger_name = req.body.burger_name;
        var index = burger_name.indexOf(".");
        console.log("index: " + index);
        burger_name = burger_name.substring(index+1, burger_name.length);
        var eatenStr = burger_name + " (Eaten by " + customer_name + ")";
        console.log("eatenStr: '" + eatenStr + "'");

        //if the customer's name is empty or blank, refresh the page.
        if (customer_name === "") {
            res.redirect("/");
        }
        //check to see if customer's name exists. If exists, then update
        //Burgers table with that customer's id.
        db.Customer.findOne({
            where: {
                cust_nm: customer_name
            }
        }).then(function(cust_data) {
            if (cust_data !== null && cust_data !== undefined) {
                // Update takes in two arguments, an object describing the properties we want to update,
                // and another "where" object describing the burgers we want to update
                db.Burger.update({
                    devoured: true,
                    burger_name: eatenStr,
                    CustomerId: cust_data.id
                }, 
                {
                    where: 
                    {
                        id: req.body.burger_id
                    }
                }).then(function(result) {
                    //res.json(result);
                    res.redirect("/");
                });
            }
            //if the customer does not exist, create it and then update the Burgers table with 
            //the newly created customer's id.
            else {
                db.Customer.create({
                    cust_nm: customer_name
                }).then(function(result) {
                    // Update takes in two arguments, an object describing the properties we want to update,
                    // and another "where" object describing the burgers we want to update
                    db.Burger.update({
                        devoured: true,
                        burger_name: eatenStr,
                        CustomerId: result.id
                    }, 
                    {
                        where: 
                        {
                            id: req.body.burger_id
                        }
                    }).then(function(result) {
                        //res.json(result);
                        res.redirect("/");
                    });
                });
            }
        });
    });

    // POST route for saving a new burger
    app.post("/burgers/create", function(req, res) {

        //if the burger's name is empty or blank, refresh the page.
        var burger_nm = req.body.burger_name.trim();
        console.log("burger_name: '" + burger_nm + "'");
        if (burger_nm === "") {
            res.redirect("/");
        }
        db.Customer.findOne({
            where: {
                cust_nm: "UNKNOWN"
            }
            //order: [['id', 'ASC']]
        }).then(function(cust_data) {
            // We have access to the customer as an argument inside of the callback function
            //res.json(cust_data);
            console.log(cust_data); 
            if (cust_data === null || cust_data === undefined) { 
                db.Customer.create({
                    cust_nm: "UNKNOWN"
                }).then(function(result) {
                    // create takes an argument of an object describing the item we want to insert
                    // into our table. In this case we just we pass in an object with a text and
                    // complete property
                    console.log(result);
                    db.Burger.create({
                        burger_name: burger_nm,
                        CustomerId: result.id
                    }).then(function(result) {
                        // We have access to the new burger as an argument inside of the callback function
                        //res.json(result);
                        res.redirect("/");
                    });
                });
            } 
            else {
                db.Burger.create({
                    burger_name: burger_nm,
                    CustomerId: cust_data.id
                }).then(function(result) {
                    // We have access to the new burger as an argument inside of the callback function
                    //res.json(result);
                    res.redirect("/");
                });
            }
        });
    });
}
