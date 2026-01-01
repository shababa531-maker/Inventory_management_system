const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (result.length > 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    }
  );
});

module.exports = router;
