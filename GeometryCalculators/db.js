const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "allin1calculator_auth",  
    password: "user",
    port: 5432,
});

module.exports = pool;
