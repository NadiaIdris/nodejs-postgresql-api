const express = require("express");
const cors = require('cors');
const studentRoutes = require("./src/student/routes/routes");
const authRoute = require("./src/user/routes/routes");
require("dotenv").config();

let isProduction = process.env.NODE_ENV === 'production';
let origin = isProduction ? '*' : 'http://localhost:3000';

const app = express();
const port = 4000;
// Express middleware to parse request body JSON data
app.use(express.json());
// Express middleware to enable CORS
app.use(cors({
  origin: origin, // Replace with your React app's URL,
  'Access-Control-Allow-Origin': origin
}));

app.use(express.static('../ts-student-list-api/build'))

app.use('/api/v1/user', authRoute)
app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
