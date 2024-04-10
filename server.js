const express = require("express");
const studentRoutes = require("./src/student/routes/routes");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
