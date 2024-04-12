const router = require("express").Router();
const {
  getStudents,
  getStudentByUid,
  addStudent,
  deleteStudentByUid,
} = require("./controller");

router.get("/", getStudents);
router.post("/addStudent", addStudent);
router.get("/:uid", getStudentByUid);
router.delete("/:uid", deleteStudentByUid);

module.exports = router;
