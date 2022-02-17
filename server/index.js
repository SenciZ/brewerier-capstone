const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3100;
// const ctrl = require("./controller");
require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
//middleware
app.use(express.json());
app.use(cors());

//endpoints
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const checkUser = await sequelize.query(
    `SELECT * FROM users WHERE user_username = '${username}'`
  );
  if (checkUser[1].rowCount !== 0) {
    res.status(401).send("Username is already taken.");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    await sequelize.query(
      `INSERT INTO users(user_first_name, user_last_name,user_username, user_email, user_crypted_password)
      VALUES('${firstName}','${lastName}','${username}','${email}','${passwordHash}')`
    );
    const userInfo = await sequelize.query(
      `SELECT user_first_name FROM users WHERE user_username ='${username}'`
    );
    res.status(200).send(userInfo);
  }
});

app.get("/login", (req, res) => {
  const { userName, password } = req.body;
});

app.listen(PORT, () =>
  console.log("Server running and listening on port ", PORT)
);
