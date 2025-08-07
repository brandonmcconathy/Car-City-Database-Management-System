// Citation for db-connector.js file:
// Date: 8/7/25
// The code in this file was copied and modified from the web application technology exploration.
// Source: https://canvas.oregonstate.edu/courses/2007765/pages/exploration-web-application-technology-2?module_item_id=25664612
// No AI tools were used.

// Get an instance of mysql we can use in the app
let mysql = require('mysql2')

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : 'cs340_mcconatb',
    password          : '9743',
    database          : 'cs340_mcconatb'
}).promise(); // This makes it so we can use async / await rather than callbacks

// Export it for use in our application
module.exports = pool;