const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3100;
// const ctrl = require("./controller");
require("dotenv").config();

const { DATABASE_URL } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
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

app.use(express.static(path.resolve(__dirname, "../build")));

//endpoints

app.post("/register", async (req, res) => {
  //destructuring req.body in order to have variables for query
  const { firstName, lastName, email, username, password } = req.body;
  //getting all entries in db where the username is the same as username provided from req.body
  const checkUser = await sequelize.query(
    `SELECT * FROM users WHERE user_username = '${username}'`
  );
  //if query returns more than 0 rows that means name is already in there and taken
  if (checkUser[1].rowCount !== 0) {
    res.status(401).send("Username is already taken.");
    //otherwise take the provided info and enter it into db
  } else {
    //creating a salt for hashing the password to be stored
    const salt = bcrypt.genSaltSync(10);
    //create new variable with the salted pasasword
    const passwordHash = bcrypt.hashSync(password, salt);
    //enter info into db but store the hashedpassword instead of actual password
    await sequelize.query(
      `INSERT INTO users(user_first_name, user_last_name,user_username, user_email, user_crypted_password)
      VALUES('${firstName}','${lastName}','${username}','${email}','${passwordHash}')`
    );
    const userInfo = await sequelize.query(
      `SELECT user_first_name FROM users WHERE user_username ='${username}'`
    );
    //return some info to the front end to use
    res.status(200).send(userInfo);
  }
});
//
app.post("/addToBrewList", async (req, res) => {
  const { name, image, location, userId, visited } = req.body;

  sequelize.query(
    `INSERT INTO user_brewerylist(user_id, brewery_name,brewery_logo, brewery_location, brewery_visited)
      VALUES('${userId}','${name}','${image}','${location}','${visited}')`
  );
  res.status(200).send("Added Brewery");
});

app.post("/getBrewList", async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  const brewList = await sequelize.query(
    `SELECT * FROM user_brewerylist WHERE user_id = '${userId}' AND brewery_visited = 'false'`
  );
  res.status(200).send(brewList);
});

app.post("/getBeenList", async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  const beenList = await sequelize.query(
    `SELECT * FROM user_brewerylist WHERE user_id = '${userId}' AND brewery_visited = 'true'`
  );
  res.status(200).send(beenList);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const validUser = await sequelize.query(
    `SELECT * FROM users WHERE user_username = '${username}'`
  );
  if (validUser[1].rowCount === 1) {
    if (bcrypt.compareSync(password, validUser[0][0].user_crypted_password)) {
      let userObject = {
        id: validUser[0][0].user_id,
        name: validUser[0][0].user_first_name,
        email: validUser[0][0].user_username,
      };
      res.status(200).send(userObject);
    } else {
      res.status(401).send("Password is Incorrect");
    }
  } else {
    res.status(402).send("Username is incorrect");
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () =>
  console.log("Server running and listening on port ", PORT)
);
