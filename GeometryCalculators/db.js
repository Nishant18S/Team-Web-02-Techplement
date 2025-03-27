const { Pool } = require("pg");

const pool = new Pool({
    user: "web02_user", 
    host: "223.230.44.3",  // Your server's public IP
    database: "allin1calculator_auth",  
    password: "web02_password",  
    port: 5432,
});

module.exports = pool;
