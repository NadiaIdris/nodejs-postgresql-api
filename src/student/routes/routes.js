const router = require("express").Router();
const {
  getStudents,
  getStudentByUid,
  addStudent,
  updateStudentByUid,
  deleteStudentByUid,
} = require("./students");
const verifyJWTToken = require("./verifyJWTToken");

router.get("/", verifyJWTToken, getStudents);
router.post("/addStudent", verifyJWTToken, addStudent);
router.get("/:uid", verifyJWTToken, getStudentByUid);
router.put("/:uid", verifyJWTToken, updateStudentByUid);
router.delete("/:uid", verifyJWTToken, deleteStudentByUid);

module.exports = router;
