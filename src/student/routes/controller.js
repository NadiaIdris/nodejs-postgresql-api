const pool = require("../../../database/database");
const {
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  deleteStudentByUidQuery,
} = require("./../../../database/queries");

/**
 * Check if poolOverride was injected as third argument for testing purposes. If not we are using the
 * actual database pool.
 * @param {js arguments object} args
 */
const checkIfPoolOverrideWasInjectedAsArg = (args) => {
  args.length === 3 ? (poolOverride = args[2]) : (poolOverride = undefined);
};

const getStudents = async (_, res) => {
  checkIfPoolOverrideWasInjectedAsArg(arguments);
  try {
    const myPool = poolOverride === undefined ? pool : poolOverride;
    const { rows } = await myPool.query(getStudentsQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getStudentByUid = async (req, res) => {
  checkIfPoolOverrideWasInjectedAsArg(arguments);
  const studentId = req.params.uid;
  try {
    const myPool = poolOverride === undefined ? pool : poolOverride;
    const { rows } = await myPool.query(getStudentByUidQuery, [studentId]);
    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const addStudent = async (req, res) => {
  checkIfPoolOverrideWasInjectedAsArg(arguments);
  const { first_name, last_name, gender, email, date_of_birth } = req.body;
  const myPool = poolOverride === undefined ? pool : poolOverride;

  // Check if email exists.
  try {
    const { rows } = await myPool.query(checkEmailExistsQuery, [email]);
    if (rows.length > 0) {
      res.status(409).send({ message: "Email already exists" });
      return;
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    return;
  }

  try {
    await myPool.query(addStudentQuery, [
      first_name,
      last_name,
      gender,
      email,
      date_of_birth,
    ]);
    res.status(201).json("Student has been created successfully!");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteStudentByUid = async (req, res, poolOverride) => {
  checkIfPoolOverrideWasInjectedAsArg(arguments);
  const studentUid = req.params.uid;
  try {
    const myPool = poolOverride === undefined ? pool : poolOverride;
    const { rows } = await myPool.query(deleteStudentByUidQuery, [studentUid]);
    if (rows.length === 0) {
      res.status(404).send({ message: "Student not found" });
      return;
    }

    res.status(200).send(`Student deleted with UID: ${studentUid}`);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getStudents,
  getStudentByUid,
  addStudent,
  deleteStudentByUid,
};
