const router = require("express").Router();
const { signupUser, loginUser } = require("./auth");

router.post("/signup", signupUser);
router.post('/login', loginUser);

module.exports = router;
