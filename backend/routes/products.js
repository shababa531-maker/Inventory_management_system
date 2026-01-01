const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.send(result);
  });
});

router.post("/add", (req, res) => {
  const { name, quantity, price } = req.body;
  db.query(
    "INSERT INTO products (name, quantity, price) VALUES (?,?,?)",
    [name, quantity, price],
    () => res.send("Product Added")
  );
});

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    () => res.send("Deleted")
  );
});

module.exports = router;
