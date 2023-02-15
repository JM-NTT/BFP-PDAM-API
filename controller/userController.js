const mysqlConnection = require("../models/mysql");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    !err ? res.json(rows) : console.log(err);
  });
};

const loginUser = (req, res, next) => {
  let user = {};

  mysqlConnection.query(
    "SELECT * FROM user WHERE BadgeNumber = ?",
    [req.body.badge],
    (err, rows, fields) => {
      if (rows.length) {
        rows.forEach((row) => {
          if (row.BadgeNumber !== req.body.badge) {
            res.status(401).send("Invalid Badge Number or password").end();
            return;
          } else if (row.Password !== req.body.password) {
            res.status(401).send("Invalid Badge Number or password").end();
            return;
          } else {
            const token = jwt.sign(
              { badge: user.BadgeNumber },
              process.env.TOKEN_SECRET
            );
            res.json({ token }).end();
          }
        });
      } else {
        res.status(401).send("Invalid Badge Number or password").end();
      }
    }
  );
};

module.exports = {
  getUsers,
  loginUser,
};
