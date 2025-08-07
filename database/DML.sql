-- Group 12, Car City Sales Management System
-- Lindsey Clement & Brandon Mcconathy
-- All work is our own. No AI tools were used.

-- Customers Page
-- Select all customers from Customers table.
-- This displays all customers when visiting customers page.
SELECT * FROM Customers;

-- Employees Page
-- Select all employees from Employees table.
-- This displays all employees when visiting employees page.
SELECT * FROM Employees;

-- Car Models Page
-- Select all car models from CarModel table.
-- This displays all car models when visiting car models page.
SELECT * FROM CarModel;

-- Cars Page
-- Select all cars from the Cars table with the car model joined.
-- This displays all cars when visiting cars page.
SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, 
    Cars.isForSale, CarModel.make, CarModel.model, CarModel.year
FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;
-- Selects all car models for the dropdowns on update and create
SELECT * FROM CarModel;

-- Repairs Page
-- Select all repairs from the Repairs table. Joins the car models and employees.
-- This displays all of the repairs when visiting the repairs page.
SELECT Repairs.repairID, Repairs.carID, CarModel.year, CarModel.make, 
    CarModel.model, Employees.fName, Employees.lName, Repairs.serviceDate, 
    Repairs.serviceType, Repairs.notes, Repairs.cost 
FROM Repairs INNER JOIN Cars ON Repairs.CarID = Cars.CarID 
INNER JOIN CarModel ON Cars.carModelID = CarModel.carModelID
INNER JOIN Employees ON Repairs.employeeID = Employees.employeeID;
-- Selects all employees for the dropdowns on update and create
SELECT * FROM Employees;
-- Joins car models to the cars table for use in dropdowns on update and create
SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, 
    Cars.isForSale, CarModel.make, CarModel.model, CarModel.year 
FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;

-- Transactions Page
-- Select all transactions from the Transactions table. Joins the car models, employees, and customers.
-- This displays all of the transactions when visiting the transactions page.
SELECT Transactions.transactionID, Transactions.carID, CarModel.year, CarModel.make, 
    CarModel.model, Employees.fName AS eFName, Employees.lName AS eLName, 
    Customers.fName AS cFName, Customers.lName AS cLName, Transactions.transactionDate, 
    Transactions.transactionAmount, Transactions.paid 
FROM Transactions INNER JOIN Cars ON Transactions.CarID = Cars.CarID 
INNER JOIN CarModel ON Cars.carModelID = CarModel.carModelID
INNER JOIN Employees ON Transactions.employeeID = Employees.employeeID
INNER JOIN Customers ON Transactions.customerID = Customers.customerID;
-- Selects all employees for use in dropdowns on update and create
SELECT * FROM Employees;
-- Selects all customers for use in dropdowns on update and create
SELECT * FROM Customers
-- Joins car models to the cars table for use in dropdowns on update and create
SELECT Cars.carID, Cars.isPreOwned, Cars.receivedDate, \
    Cars.isForSale, CarModel.make, CarModel.model, CarModel.year \
FROM Cars INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID;
