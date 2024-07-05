const pool = require("../../../database/database");
const {
  checkRegUserEmailExistsQuery,
  addRegUserQuery,
  deleteRegUserQuery,
} = require("../../../database/queries");
const {
  validateSignUpData,
  validateLoginData,
} = require("../../../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  // Validate the user data sent to the server.
  const { error } = validateSignUpData(req.body);
  if (error) {
    console.log("signupUser -> Validate the user data sent to the server errors out: ", error);
    return res.status(400).send(error.details[0].message);
  }

  // Check that user in not already in the database.
  const { first_name, last_name, email, password } = req.body;
  try {
    const { rows } = await pool.query(checkRegUserEmailExistsQuery, [email]);
    if (rows.length > 0) {
      console.log("signupUser -> Email already exists sends status code 409: ", rows);
      return res.status(409).send("Email already exists");
    }
  } catch (error) {
    console.log("signupUser -> Check that user in not already in the database errors out: ", error);
    return res.status(500).send("Internal Server Error while checking email");
  }

  // Hash the password.
  const hashedPassword = await encryptPassword(password);

  // Create a new user and add the user to the database.
  try {
    const { rows } = await pool.query(addRegUserQuery, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);
    let uid = rows[0].registered_user_uid;
    console.log("User has been created successfully! -->", uid)
    res
      .status(201)
      .send(`User with uid: ${uid} has been created successfully!`);
  } catch (error) {
    console.log("signupUser -> Create a new user and add the user to the database errors out: ", error);
    res.status(500).send("Internal Server Error while adding user to database");
  }
};

const loginUser = async (req, res) => {
  // Validate the user data sent to the server.
  const { error } = validateLoginData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user exists in the database.
  const { email, password: logInPassword } = req.body;
  try {
    const { rows } = await pool.query(checkRegUserEmailExistsQuery, [email]);
    if (rows.length === 0) {
      return res.status(401).send("Email or password is incorrect");
    }
    const user = rows[0];
    // Check if the password is correct.
    const { password: passwordInDB, registered_user_uid: uid } = user;
    const validPassword = await bcrypt.compare(logInPassword, passwordInDB);
    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect");
    }
    // Remove password from the user object. Do not delete the line below!!!
    delete user.password;
    // Generate jwt token and send it to the client.
    const accessToken = generateAccessToken(uid);
    res
      .status(200)
      .header("Authorization", accessToken)
      .header("Access-Control-Expose-Headers", "Authorization")
      .json(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error while checking email");
  }
};

const deleteUserByUid = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await pool.query(deleteRegUserQuery, [userId]);
    if (rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(`User with uid: ${userId} has been deleted`);
  } catch (error) {
    res.status(500).send("Internal Server Error while deleting user");
  }
};

function generateAccessToken(uid) {
  const token = jwt.sign({ uid }, process.env.TOKEN_SECRET);
  const bearerToken = `Bearer ${token}`;
  console.log("generateAccessToken -> bearerToken: ", bearerToken);
  return bearerToken;
}

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("encryptPassword -> hashedPassword: ", hashedPassword);
  return hashedPassword;
}

module.exports = { signupUser, loginUser, deleteUserByUid };
