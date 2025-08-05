-- Database Manipulation Queries

-- Select all customers and contact info from the Customers entity
SELECT CONCAT(fName,' ',lName) AS name, phoneNumber, email
FROM Customers;

-- Select all employees and job title from Employees entity
SELECT CONCAT(fName,' ',lName) AS name, jobTitle
FROM Employees;

-- Select all cars that are for sale
SELECT CarModel.year, CarModel.make, CarModel.model
FROM Cars
INNER JOIN CarModel ON Cars.CarModelID = CarModel.CarModelID
WHERE Cars.isForSale;

-- Select all repairs that cost more than 100
SELECT Repairs.serviceType, Repairs.cost,
    CONCAT(CarModel.year,' ',CarModel.make,' ',CarModel.model) as carModel,
    CONCAT(Employees.fName,' ',Employees.lName) AS employee
FROM Repairs
INNER JOIN Employees ON Repairs.employeeID = Employees.employeeID
INNER JOIN Cars on Repairs.carID = Cars.carID
INNER JOIN CarModel on Cars.carModelID = CarModel.carModelID
WHERE Repairs.cost > 100;


-- Select all transactions that have been paid
SELECT CONCAT(CarModel.year,' ',CarModel.make,' ',CarModel.model) as carModel,
    CONCAT(Employees.fName,' ',Employees.lName) AS employee, 
    CONCAT(Customers.fName,' ',Customers.lName) AS customer, Transactions.transactionAmount
FROM Transactions
INNER JOIN Employees ON Transactions.employeeID = Employees.employeeID
INNER JOIN Customers ON Transactions.customerID = Customers.customerID
INNER JOIN Cars ON Transactions.carID = Cars.carID
INNER JOIN CarModel ON Cars.carModelID = CarModel.carModelID
WHERE Transactions.paid;