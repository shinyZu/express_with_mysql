const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const connection = require("../configs/db.configs");

router.get("/", (req, res) => {
  var query_getAll = "SELECT * FROM item";
  connection.query(query_getAll, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/:code", (req, res) => {
  const code = req.params.code;

  var query = "SELECT * FROM item WHERE item_code=?";
  connection.query(query, [code], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const code = body.item_code;
  const description = body.description;
  const price = body.unit_price;
  const qty = body.qtyOnHand;

  var query =
    "INSERT INTO item (item_code, description, unit_price, qtyOnHand) VALUES (?,?,?,?)";

  connection.query(query, [code, description, price, qty], (err) => {
    if (err) {
      res.send({ message: "Item Already exists with code : " + code });
    } else {
      res.send({ message: "Item Saved Sucessfully!" });
    }
  });
});

router.put("/", (req, res) => {
  const body = req.body;
  const code = body.item_code;
  const description = body.description;
  const price = body.unit_price;
  const qty = body.qtyOnHand;

  var query =
    "UPDATE item SET description=?, unit_price=?, qtyOnHand=? WHERE item_code=?";
  connection.query(query, [description, price, qty, code], (err, result) => {
    if (err) throw err;

    if (result.affectedRows) {
      res.send({ message: "Item Updated Successfully!" });
    } else {
      res.send({ message: "Item Not Found" });
    }
  });
});

router.delete("/:code", (req, res) => {
  const code = req.params.code;
  var query = "DELETE FROM item WHERE item_code=?";

  connection.query(query, [code], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({ message: "Item Deleted Successfully!" });
    } else {
      res.send({ message: "Item Not Found" });
    }
  });
});

module.exports = router;
