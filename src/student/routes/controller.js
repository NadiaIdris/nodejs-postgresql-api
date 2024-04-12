const pool = require("../../../database/database");
const {
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  deleteStudentByUidQuery,
} = require("./../../../database/queries");

const getStudents = (req, res) => {
  pool.query(getStudentsQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentByUid = async (req, res) => {
  const studentId = req.params.uid;

  try {
    const { rows } = await pool.query(getStudentByUidQuery, [studentId]);
    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }
    res.json(rows[0]); // Send the first row (assuming unique student IDs)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  const { first_name, last_name, gender, email, date_of_birth } = req.body;

  // Check if email exists.
  try {
    const { rows } = await pool.query(checkEmailExistsQuery, [email]);
    if (rows.length > 0) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
    return;
  }

  try {
    await pool.query(addStudentQuery, [
      first_name,
      last_name,
      gender,
      email,
      date_of_birth,
    ]);
    res.status(201).json("Student has been created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteStudentByUid = async (req, res) => {
  const studentUid = req.params.uid;

  pool.query(deleteStudentByUidQuery, [studentUid], (error, results) => {
    // If there is something wrong with the query or uid is not found, throw an error.
    if (error) {
      res.status(500).send({ message: error.message });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }
    res.status(200).send(`Student deleted with ID: ${studentUid}`);
  });
};

module.exports = {
  getStudents,
  getStudentByUid,
  addStudent,
  deleteStudentByUid,
};
