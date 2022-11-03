const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const sequelize = require("./database");

const admin = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/allocate_phone_number", admin);

app.use("/", admin);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
