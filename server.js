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

app.use("/api/v1/user", authRoute);
app.use("/api/v1/students", studentRoutes);

// Test connection to db by sending a query. Connect to the db
pool.query("SELECT NOW();", (err, res) => {
  if (err) {
    console.log("Error: ", err);
    console.log("Failed to connect to the database");
    return;
  } else {
    console.log("Connected to database: ", res.rows[0].now);

    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  }
});
