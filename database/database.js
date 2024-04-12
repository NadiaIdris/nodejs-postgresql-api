const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
});

module.exports = pool;
