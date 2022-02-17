require("dotenv").config();
const bcrypt = require("bcryptjs");

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const authenticated = bcrypt.compareSync(
          password,
          users[i].passwordHash
        );
        if (authenticated) {
          let userToReturn = { ...users[i] };
          delete userToReturn.passwordHash;
          res.status(200).send(userToReturn);
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);
    let user = {
      username,
      email,
      firstName,
      lastName,
      passwordHash,
    };
    users.push(user);
    let userToReturn = { ...user };
    delete userToReturn.passwordHash;
    res.status(200).send(userToReturn);
  },
};

//   getAllProducts: (req, res) => {
//     sequelize
//       .query(`SELECT * FROM products ORDER BY RANDOM();`)
//       .then((dbRes) => res.status(200).send(dbRes[0]))
//       .catch((err) => console.log(err));
//   },

//   getFeaturedProducts: (req, res) => {
//     sequelize
//       .query(`SELECT * FROM featured ORDER BY RANDOM();`)
//       .then((dbRes) => res.status(200).send(dbRes[0]))
//       .catch((err) => console.log(err));
//   },

//   getAllMenProducts: (req, res) => {
//     sequelize
//       .query(
//         `SELECT * FROM products WHERE product_category_id=1 ORDER BY RANDOM();`
//       )
//       .then((dbRes) => res.status(200).send(dbRes[0]))
//       .catch((err) => console.log(err));
//   },

//   getClickedProduct: (req, res) => {
//     const { id } = req.params;
//     sequelize
//       .query(`SELECT * FROM products WHERE product_id=${id};`)
//       .then((dbRes) => res.status(200).send(dbRes[0]))
//       .catch((err) => console.log(err));
//   },

//   getAllWomensProducts: (req, res) => {
//     sequelize
//       .query(
//         `SELECT * FROM products WHERE product_category_id=2 ORDER BY RANDOM();`
//       )
//       .then((dbRes) => res.status(200).send(dbRes[0]))
//       .catch((err) => console.log(err));
//   },

//   subscribe: (req, res) => {
//     let newSubscriber = req.body.email;
//     console.log(req.body.email);
//     sequelize
//       .query(
//         `INSERT INTO subscribe_list(subscriber_email) VALUES('${newSubscriber}');`
//       )
//       .then((dbRes) => res.status(200).send(dbRes))
//       .catch((err) => console.log(err));
//   },
// };
