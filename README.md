 ## Sequelized Burgers:

My name is Hai Nguyen. I created this application (Eat-Da-Burgers) as part of the homework assignment for the Full Stack Web Development class I am taking at the University of Denver. It is written in Node JavaScript, handlebars, express, and sequelize. It uses MySql database to persist the data. When the app is first launched, it displays a list hamburgers that have not been devoured on the left and the corresponding "Devour it" buttons and a list of burgers that have been devoured on the right if there are hamburgers in the database. At the bottom are the input text field which allows the user to enter a new burger to devour and the submit button. After a new burger is entered in the input text field and the submit button is clicked, the new burger will be displayed on the left with the corresponding "Devour it" button. If you click on any of the "Devour it" button, the burger will be devoured and the hamburger gets displayed to the right. Please see images below.

## Design Notes:

Couple important notes about the design of this application:

* There are two database tables (Customers and Burgers) required as part of this application. Because the Burgers table is belong to the Customers table (many-to-one relationship), everytime a hamburger is added, first, the app will look in the Customers table using the "UNKNOWN" customer's name in the where clause. If the row does not exist, the application will create a row in the Customers table with the cust_nm set to "UNKNOWN" and then using the unique id that is associated with the "UNKNOWN" row to create a row in the Burgers table. If the row for the "UNKNOWN" customer exists, the application will the existing id to add a row in the Burgers table. In short, everytime a hamburger is added, the application will add a row into the Burgers table with the id associated with the "UNKNOWN" customer.

* When a hamburger is devoured (user clicks on the "Devour it" button), the user must fill in the customer's name in the text box. In this case, the application will search the customer's name in the Customers table for an id. If the id exists, the application will use that id to update the row in Burgers table. If the id does not exist, the application will create a row in the Customers table and use the newly created id to update the Burgers table.

![Image of Eat-Da-Burgers application](https://github.com/hnguy0221/SequelizedBurgers/blob/master/public/assets/images/Eat-Da-Burgers-2.png)

![Image of Eat-Da-Burgers application](https://github.com/hnguy0221/SequelizedBurgers/blob/master/public/assets/images/Eat-Da-Burgers-1.png)

If there are no hamburgers in the database, the application is displayed like the one below:

![Image of Eat-Da-Burgers application](https://github.com/hnguy0221/SequelizedBurgers/blob/master/public/assets/images/Eat-Da-Burgers-No-Data.png)

* Live Demo: <https://guarded-brushlands-49347.herokuapp.com/>

## To install the application, please follow these steps:

* Git Clone the repository
* Navigate to the folder where the repository exists using Git Bash or Terminal.
* Run the command `npm install` to download the required dependencies.
* Then run the command `node server.js` to run the program.