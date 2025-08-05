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

app.get('/customers', async function (req, res) {
    try {
        const query1 = `SELECT * FROM Customers;`;
        const [customers] = await db.query(query1);

        res.render('customers', { customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/employees', async function (req, res) {
    try {
        const query1 = `SELECT * FROM Employees;`;
        const [employees] = await db.query(query1);

        res.render('employees', { employees: employees });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/car-models', async function (req, res) {
    try {
        const query1 = `SELECT * FROM CarModel;`;
        const [models] = await db.query(query1);

        res.render('car-models', { models: models });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/cars', async function (req, res) {
    try {
        const query1 = `SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, \
            Cars.isForSale, CarModel.make, CarModel.model, CarModel.year \
            FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;`;
        const query2 = 'SELECT * FROM CarModel;';
        const [cars] = await db.query(query1);
        const [models] = await db.query(query2);
        
        res.render('cars', { cars: cars, models: models });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/repairs', async function (req, res) {
    try {
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
        
        res.render('repairs', { repairs: repairs, cars: cars, employees: employees });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/transactions', async function (req, res) {
    try {
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
        
        res.render('transactions', { transactions: transactions, cars: cars, employees: employees, customers: customers });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// RESET DB
app.get('/reset', async function (req, res) {
    try {
        const query1 = `CALL sp_Reset();`;
        await db.query(query1);

        // Redirect the user to the homepage
        res.redirect('/');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// CREATE ROUTES

// Create Customer
app.post('/customers/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        const query1 = `CALL sp_CreateCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_customer_fname,
            data.create_customer_lname,
            data.create_customer_ad1,
            data.create_customer_ad2,
            data.create_customer_city,
            data.create_customer_state,
            data.create_customer_country,
            data.create_customer_postalcode,
            data.create_customer_number,
            data.create_customer_email
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Create Employee
app.post('/employees/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        const query1 = `CALL sp_CreateEmployee(?, ?, ?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_employee_fname,
            data.create_employee_lname,
            data.create_employee_jt,
            data.create_employee_dealer,
            data.create_employee_email,
            data.create_employee_number,
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/employees');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Create Car Model
app.post('/car-models/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        const query1 = `CALL sp_CreateCarModel(?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_model_make,
            data.create_model_model,
            data.create_model_year,
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/car-models');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/cars/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        const query1 = `CALL sp_CreateCar(?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_car_model,
            data.create_car_pre,
            data.create_car_date,
            data.create_car_sale
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/cars');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/repairs/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        const query1 = `CALL sp_CreateRepair(?, ?, ?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_repair_employee,
            data.create_repair_car,
            data.create_repair_date,
            data.create_repair_type,
            data.create_repair_notes,
            data.create_repair_cost
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/repairs');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/transactions/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        const query1 = `CALL sp_CreateTransaction(?, ?, ?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_transaction_customer,
            data.create_transaction_employee,
            data.create_transaction_car,
            data.create_transaction_date,
            data.create_transaction_amount,
            data.create_transaction_paid,
        ]);

        // Redirect the user to the updated webpage
        res.redirect('/transactions');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE ROUTES

// DELETE ROUTES

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});