const router = require("express").Router();
const { signupUser, loginUser, deleteUserByUid } = require("./auth");
const verifyJWTToken = require("../../student/routes/verifyJWTToken");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.delete("/:userId/delete", verifyJWTToken, deleteUserByUid);

module.exports = router;
