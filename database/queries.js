const { STUDENT_CONSTANTS } = require("./databaseConstants");

const {
  STUDENT,
  STUDENT_UID,
  FIRST_NAME,
  LAST_NAME,
  GENDER,
  EMAIL,
  DATE_OF_BIRTH,
} = STUDENT_CONSTANTS;

const getRegisteredUser = `SELECT * FROM registered_user WHERE email = $1`;

const getStudentsQuery = `SELECT * FROM ${STUDENT}`;
const getStudentByUidQuery = `SELECT * FROM ${STUDENT} WHERE ${STUDENT_UID} = $1`;
const addStudentQuery = `INSERT INTO ${STUDENT} (${STUDENT_UID}, ${FIRST_NAME}, ${LAST_NAME}, ${GENDER}, ${EMAIL}, ${DATE_OF_BIRTH}) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5) RETURNING *`;
const checkEmailExistsQuery = `SELECT ${EMAIL} FROM ${STUDENT} WHERE ${EMAIL} = $1`;
const updateStudentByUidQuery = `UPDATE ${STUDENT} SET ${FIRST_NAME} = $1, ${LAST_NAME} = $2, ${EMAIL} = $3, ${GENDER} = $4, ${DATE_OF_BIRTH} = $5 WHERE ${STUDENT_UID} = $6 RETURNING *`;
const deleteStudentByUidQuery = `DELETE FROM ${STUDENT} WHERE ${STUDENT_UID} = $1 RETURNING *`;

module.exports = {
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  updateStudentByUidQuery,
  deleteStudentByUidQuery,
};
