const Joi = require('@hapi/joi');
const pool = require('../../database/database');

const registerUser = async (req, res) => {
  // Validate the data.
  const schema = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(1024).required()
  });
  const { error } = schema.validate();
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check that user in not already in the database.
  try { 
    const { rows } = await pool.query(); 
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
  // Hash the password.

  // Crate a new user.

  // Add the user to the database.
  return
};

module.exports = { registerUser };


/*
 {
 first_name: "",
 last_name: "",
 email: "",
 password: ""
 } 
 */