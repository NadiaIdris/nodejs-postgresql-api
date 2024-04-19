const getStudentsQuery = "SELECT * FROM student";
const getStudentByUidQuery = "SELECT * FROM student WHERE student_uid = $1";
const addStudentQuery =
  "INSERT INTO student (student_uid, first_name, last_name, gender, email, date_of_birth) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5) RETURNING *";
const checkEmailExistsQuery = "SELECT email FROM student WHERE email = $1";
const updateStudentByUidQuery = "UPDATE student SET first_name = $1, last_name = $2, email = $3, gender = $4, date_of_birth = $5 WHERE student_uid = $6 RETURNING *";
const deleteStudentByUidQuery = "DELETE FROM student WHERE student_uid = $1 RETURNING *";

module.exports = {
  getStudentsQuery,
  getStudentByUidQuery,
  addStudentQuery,
  checkEmailExistsQuery,
  updateStudentByUidQuery,
  deleteStudentByUidQuery
};
