const router = require("express").Router();
const { getStudents } = require("./controller");

router.get("/", getStudents);

module.exports = router;
