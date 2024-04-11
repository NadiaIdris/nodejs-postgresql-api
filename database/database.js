const Pool = require("pg").Pool;

const pool = new Pool({
  host: 'localhost',
  database: 'students_db',
  password: 'nadiapower',
  port: 5432,
  user: 'nadia',
});

module.exports = pool;
