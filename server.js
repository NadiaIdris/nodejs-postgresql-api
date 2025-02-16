const express = require("express");
const cors = require("cors");
const studentRoutes = require("./src/student/routes/routes");
const authRoute = require("./src/user/routes/routes");
const pool = require("./database/database");
require("dotenv").config();

let origin = "*";

const app = express();
const port = 4000;
// Express middleware to parse request body JSON data
app.use(express.json());
// Express middleware to enable CORS
app.use(
  cors({
    origin: origin, // Replace with your React app's URL,
    "Access-Control-Allow-Origin": origin,
  })
);

// Make / route display a message
app.get("/", (req, res) => {
  console.log("API Server is running");
  res.status(200).send("API Server is running");
});

// Actual routes
app.use("/api/v1/user", authRoute);
app.use("/api/v1/students", studentRoutes);

// Test connection to db by sending a query. Connect to the db
const query = `SELECT EXISTS (
  SELECT datname FROM pg_database WHERE datname = 'students_db'
);`;

pool.query(query, (err, res) => {
  if (err) {
    console.log("Error: ", err);
    console.log("Failed to connect to the database");
    return;
  } else {
    console.log("Connected to database: ", res.rows[0]);

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  }
});
