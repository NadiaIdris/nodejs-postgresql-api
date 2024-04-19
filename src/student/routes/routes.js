const router = require("express").Router();
const {
  getStudents,
  getStudentByUid,
  addStudent,
  updateStudentByUid,
  deleteStudentByUid
} = require("./controller");

router.get("/", getStudents);
router.post("/addStudent", addStudent);
router.get("/:uid", getStudentByUid);
router.put("/:uid", updateStudentByUid);
router.delete("/:uid", deleteStudentByUid);

module.exports = router;
