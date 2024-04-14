const dbPool = require("../../../database/database");
const {
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  deleteStudentByUidQuery,
} = require("./../../../database/queries");

const getStudents = async (_, res, poolOverride) => {
  const pool = getPool(dbPool, poolOverride);
  try {
    const { rows } = await pool.query(getStudentsQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getStudentByUid = async (req, res, poolOverride) => {
  const pool = getPool(dbPool, poolOverride);
  const studentId = req.params.uid;
  try {
    const { rows } = await pool.query(getStudentByUidQuery, [studentId]);
    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addStudent = async (req, res, poolOverride) => {
  const pool = getPool(dbPool, poolOverride);
  const { first_name, last_name, gender, email, date_of_birth } = req.body;

  // Check if email exists.
  try {
    const { rows } = await pool.query(checkEmailExistsQuery, [email]);
    if (rows.length > 0) {
      res.status(409).send({ message: "Email already exists" });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
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
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteStudentByUid = async (req, res, poolOverride) => {
  const pool = getPool(dbPool, poolOverride);

  const studentUid = req.params.uid;
  try {
    const { rows } = await pool.query(deleteStudentByUidQuery, [studentUid]);
    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }

    res.status(200).send(`Student deleted with UID: ${studentUid}`);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

/**
 * In testing, we mock up the pool object and pass it as an argument to the function.
 * In production, we don't pass 'pool' as an argument to the function. We use the imported pool.
 * Because we use Express Routes, we need to check if the poolOverride is a function or not.
 * Because Express Routes allow to pass middleware functions as arguments after req and res arguments.
 * So, if the poolOverride is a function, we are calling this function in production and we use
 * the imported pool instead.
 */
function getPool(pool, poolOverride) {
  return typeof poolOverride === "function" ? pool : poolOverride;
}

module.exports = {
  getStudents,
  getStudentByUid,
  addStudent,
  deleteStudentByUid,
};
