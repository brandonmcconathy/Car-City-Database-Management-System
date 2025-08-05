-- Group 12, Car City Sales Management System
-- Lindsey Clement & Brandon Mcconathy
-- All work is our own. No AI tools were used.

-- #############################
-- #############################
-- CREATE Procedures
-- #############################
-- #############################

-- #############################
-- CREATE Customers
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateCustomer;

DELIMITER //
CREATE PROCEDURE sp_CreateCustomer(
    IN p_fName VARCHAR(100), 
    IN p_lName VARCHAR(100), 
    IN p_addressLine1 VARCHAR(150), 
    IN p_addressLine2 VARCHAR(150), 
    IN p_city VARCHAR(100), 
    IN p_state VARCHAR(20),
    IN p_country VARCHAR(50),
    IN p_postalCode VARCHAR(50),
    IN p_phoneNumber VARCHAR(20),
    IN p_email VARCHAR(254),
    OUT p_id INT)
BEGIN
    INSERT INTO Customers (fName, lName, addressLine1, addressLine2, city, state, country, postalCode, phoneNumber, email) 
    VALUES (p_fName, p_lName, p_addressLine1, p_addressLine2, p_city, p_state, p_country, p_postalCode, p_phoneNumber, p_email);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE Employees
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateEmployee;

DELIMITER //
CREATE PROCEDURE sp_CreateEmployee(
    IN p_fName VARCHAR(100), 
    IN p_lName VARCHAR(100), 
    IN p_jobTitle VARCHAR(50), 
    IN p_isDealer TINYINT, 
    IN p_email VARCHAR(254), 
    IN p_phoneNumber VARCHAR(20),
    OUT p_id INT)
BEGIN
    INSERT INTO Employees (fName, lName, jobTitle, isDealer, email, phoneNumber) 
    VALUES (p_fName, p_lName, p_jobTitle, p_isDealer, p_email, p_phoneNumber);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE Car Models
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateCarModel;

DELIMITER //
CREATE PROCEDURE sp_CreateCarModel(
    IN p_make VARCHAR(50), 
    IN p_model VARCHAR(50),
    IN p_year INT,
    OUT p_id INT)
BEGIN
    INSERT INTO CarModel (make, model, year) 
    VALUES (p_make, p_model, p_year);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE Cars
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateCar;

DELIMITER //
CREATE PROCEDURE sp_CreateCar(
    IN p_carModelID INT, 
    IN p_isPreOwned TINYINT,
    IN p_receivedDate TINYINT,
    IN p_isForSale TINYINT,
    OUT p_id INT)
BEGIN
    INSERT INTO Cars (carModelID, isPreOwned, receivedDate, isForSale) 
    VALUES (p_carModelID, p_isPreOwned, p_receivedDate, p_isForSale);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE Repairs
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateRepair;

DELIMITER //
CREATE PROCEDURE sp_CreateRepair(
    IN p_employeeID INT,
    IN p_carID INT, 
    IN p_serviceDate DATETIME, 
    IN p_serviceType VARCHAR(100), 
    IN p_notes VARCHAR(255), 
    IN p_cost DECIMAL(10,2), 
    OUT p_id INT)
BEGIN
    INSERT INTO Repairs (employeeID, carID, serviceDate, serviceType, notes, cost) 
    VALUES (p_employeeID, p_carID, p_serviceDate, p_serviceType, p_notes, p_cost);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE Transactions
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateTransaction;

DELIMITER //
CREATE PROCEDURE sp_CreateTransaction(
    IN p_customerID INT,
    IN p_employeeID INT,
    IN p_carID INT, 
    IN p_transactionDate DATETIME, 
    IN p_transactionAmount DECIMAL(10,2),
    IN p_paid TINYINT, 
    OUT p_id INT)
BEGIN
    INSERT INTO Transactions (customerID, employeeID, carID, transactionDate, transactionAmount, paid) 
    VALUES (p_customerID, p_employeeID, p_carID, p_transactionDate, p_transactionAmount, p_paid);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- #############################
-- DELETE Procedures
-- #############################
-- #############################

-- #############################
-- DELETE Customer
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteCustomer;

DELIMITER //
CREATE PROCEDURE sp_DeleteCustomer(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Transactions WHERE customerID = p_id;
        DELETE FROM Customers WHERE customerID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Customers for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Employee
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteEmployee;

DELIMITER //
CREATE PROCEDURE sp_DeleteEmployee(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Transactions WHERE EmployeeID = p_id;
        DELETE FROM Repairs WHERE EmployeeID = p_id;
        DELETE FROM Employees WHERE EmployeeID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Employees for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Car Model
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteCarModel;

DELIMITER //
CREATE PROCEDURE sp_DeleteCarModel(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Cars WHERE carModelID = p_id;
        DELETE FROM CarModel WHERE carModelID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in CarModel for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Car
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteCar;

DELIMITER //
CREATE PROCEDURE sp_DeleteCar(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Transactions WHERE carID = p_id;
        DELETE FROM Repairs WHERE carID = p_id;
        DELETE FROM Cars WHERE carID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Cars for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Repair
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteRepair;

DELIMITER //
CREATE PROCEDURE sp_DeleteRepair(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Repairs WHERE repairID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Repairs for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- DELETE Transaction
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteTransaction;

DELIMITER //
CREATE PROCEDURE sp_DeleteTransaction(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Transactions WHERE transactionID = p_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Transactions for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;