const {
  STUDENT_CONSTANTS,
  REGISTERED_USER_CONSTANTS,
} = require("./databaseConstants");

/* Registered user table queries */
const {
  REGISTERED_USER: REG_USER,
  REGISTERED_USER_UID: REG_USER_UID,
  FIRST_NAME: REG_USER_FIRST_NAME,
  LAST_NAME: REG_USER_LAST_NAME,
  EMAIL: REG_USER_EMAIL,
  PASSWORD: REG_USER_PASSWORD,
} = REGISTERED_USER_CONSTANTS;

const checkRegUserEmailExistsQuery = `SELECT * FROM ${REG_USER} WHERE ${REG_USER_EMAIL} = $1`;
const addRegUserQuery = `INSERT INTO ${REG_USER} (${REG_USER_UID}, ${REG_USER_FIRST_NAME}, ${REG_USER_LAST_NAME}, ${REG_USER_EMAIL}, ${REG_USER_PASSWORD}) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING ${REG_USER_UID}`;

/* Student table queries */
const {
  STUDENT,
  STUDENT_UID,
  FIRST_NAME: STUDENT_FIRST_NAME,
  LAST_NAME: STUDENT_LAST_NAME,
  GENDER: STUDENT_GENDER,
  EMAIL: STUDENT_EMAIL,
  DATE_OF_BIRTH: STUDENT_DATE_OF_BIRTH,
} = STUDENT_CONSTANTS;

const getStudentsQuery = `SELECT * FROM ${STUDENT}`;
const getStudentByUidQuery = `SELECT * FROM ${STUDENT} WHERE ${STUDENT_UID} = $1`;
const addStudentQuery = `INSERT INTO ${STUDENT} (${STUDENT_UID}, ${STUDENT_FIRST_NAME}, ${STUDENT_LAST_NAME}, ${STUDENT_GENDER}, ${STUDENT_EMAIL}, ${STUDENT_DATE_OF_BIRTH}) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5) RETURNING *`;
const checkEmailExistsQuery = `SELECT ${STUDENT_EMAIL} FROM ${STUDENT} WHERE ${STUDENT_EMAIL} = $1`;
const updateStudentByUidQuery = `UPDATE ${STUDENT} SET ${STUDENT_FIRST_NAME} = $1, ${STUDENT_LAST_NAME} = $2, ${STUDENT_EMAIL} = $3, ${STUDENT_GENDER} = $4, ${STUDENT_DATE_OF_BIRTH} = $5 WHERE ${STUDENT_UID} = $6 RETURNING *`;
const deleteStudentByUidQuery = `DELETE FROM ${STUDENT} WHERE ${STUDENT_UID} = $1 RETURNING *`;

module.exports = {
  checkRegUserEmailExistsQuery,
  addRegUserQuery,
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  updateStudentByUidQuery,
  deleteStudentByUidQuery,
};
