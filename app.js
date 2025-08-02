// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 6285;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engine for *.hbs files.

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {
    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

/*
app.get('/bsg-people', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT bsg_people.id, bsg_people.fname, bsg_people.lname, \
            bsg_planets.name AS 'homeworld', bsg_people.age FROM bsg_people \
            LEFT JOIN bsg_planets ON bsg_people.homeworld = bsg_planets.id;`;
        const query2 = 'SELECT * FROM bsg_planets;';
        const [people] = await db.query(query1);
        const [homeworlds] = await db.query(query2);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('bsg-people', { people: people, homeworlds: homeworlds });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
*/

app.get('/customers', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Customers;`;
        const [customers] = await db.query(query1);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('customers', { customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/employees', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM Employees;`;
        const [employees] = await db.query(query1);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('employees', { employees: employees });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/car-models', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT * FROM CarModel;`;
        const [models] = await db.query(query1);

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('car-models', { models: models });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/cars', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, \
            Cars.isForSale, CarModel.make, CarModel.model, CarModel.year \
            FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;`;
        const query2 = 'SELECT * FROM CarModel;';
        const [cars] = await db.query(query1);
        const [models] = await db.query(query2);
        

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('cars', { cars: cars, models: models });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/repairs', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT Repairs.repairID, Repairs.carID, CarModel.year, CarModel.make, \ 
            CarModel.model, Employees.fName, Employees.lName, Repairs.serviceDate, \
            Repairs.serviceType, Repairs.notes, Repairs.cost 
            FROM Repairs INNER JOIN Cars ON Repairs.CarID = Cars.CarID \
            INNER JOIN CarModel ON Cars.carModelID = CarModel.carModelID
            INNER JOIN Employees ON Repairs.employeeID = Employees.employeeID;`;
        const query2 = 'SELECT * FROM Employees;';
        const query3 = `SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, \
            Cars.isForSale, CarModel.make, CarModel.model, CarModel.year \
            FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;`;
        const [repairs] = await db.query(query1);
        const [employees] = await db.query(query2);
        const [cars] = await db.query(query3);
        

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('repairs', { repairs: repairs, cars: cars, employees: employees });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/transactions', async function (req, res) {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT Transactions.transactionID, Transactions.carID, CarModel.year, CarModel.make, \ 
            CarModel.model, Employees.fName AS eFName, Employees.lName AS eLName, \
            Customers.fName AS cFName, Customers.lName AS cLName, Transactions.transactionDate, \
            Transactions.transactionAmount, Transactions.paid 
            FROM Transactions INNER JOIN Cars ON Transactions.CarID = Cars.CarID \
            INNER JOIN CarModel ON Cars.carModelID = CarModel.carModelID
            INNER JOIN Employees ON Transactions.employeeID = Employees.employeeID
            INNER JOIN Customers ON Transactions.customerID = Customers.customerID;`;
        const query2 = 'SELECT * FROM Employees;';
        const query3 = `SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, \
            Cars.isForSale, CarModel.make, CarModel.model, CarModel.year \
            FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;`;
        const query4 = 'SELECT * FROM Customers';
        const [transactions] = await db.query(query1);
        const [employees] = await db.query(query2);
        const [cars] = await db.query(query3);
        const [customers] = await db.query(query4);
        

        // Render the bsg-people.hbs file, and also send the renderer
        //  an object that contains our bsg_people and bsg_homeworld information
        res.render('transactions', { transactions: transactions, cars: cars, employees: employees, customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});