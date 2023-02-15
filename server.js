const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./models/mysql");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//connections
const port = 8080;

//import api
const userRouter = require("./routes/userRoutes");

//endpoint API
app.use("/api/user", userRouter);

mysqlConnection.connect((err) => {
  !err
    ? console.log("Connected to Database")
    : console.log("Connection Failed" + JSON.stringify(err));
});
app.listen(port, () => {
  console.log("Connected Succesfully");
});

//if no home detected
app.use((req, res) => {
  res.status(404).render("page404", { title: "Page not Found!" });
});
