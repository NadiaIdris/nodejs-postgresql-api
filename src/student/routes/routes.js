const router = require("express").Router();
const { getStudents, getStudentById, addStudent } = require("./controller");

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/addStudent", addStudent);

module.exports = router;
