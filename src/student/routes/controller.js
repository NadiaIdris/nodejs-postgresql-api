const pool = require("../../../database/database");
const {
  getStudentsQuery,
  getStudentByIdQuery,
  addStudentQuery
} = require("./../../../database/queries");

const getStudents = (req, res) => {
  pool.query(getStudentsQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const { rows } = await pool.query(getStudentByIdQuery, [studentId]);

    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
    } else {
      res.json(rows[0]); // Send the first row (assuming unique student IDs)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addStudent = async (req, res) => {
  const { first_name, last_name, gender, email, date_of_birth } = req.body;

  try {
    const newStudent = await pool.query(addStudentQuery, [
      first_name,
      last_name,
      gender,
      email,
      date_of_birth,
    ]);
    res.status(201).json(newStudent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getStudents, getStudentById, addStudent };
