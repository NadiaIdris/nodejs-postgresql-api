const pool = require('./../../../database/db');
const { getStudentsQuery } = require("./../../../database/queries");

const getStudents = async (req, res) => {
  pool.query(getStudentsQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = { getStudents };
