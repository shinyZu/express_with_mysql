const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const connection = require("../configs/db.configs");

router.get("/", (req, res) => {
  var query_getAll = "SELECT * FROM order_detail";
  connection.query(query_getAll, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/search", (req, res) => {
  const order_id = req.body.order_id;
  const item_code = req.body.item_code;

  var query = "SELECT * FROM order_detail WHERE order_id=? AND item_code=?";
  connection.query(query, [order_id, item_code], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const order_id = body.order_id;
  const item_code = body.item_code;
  const order_qty = body.order_qty;

  var query =
    "INSERT INTO order_detail (order_id, item_code, order_qty) VALUES (?,?,?)";

  connection.query(query, [order_id, item_code, order_qty], (err) => {
    if (err) {
      res.send({ message: "No Any Order Details" });
    } else {
      res.send({ message: "Details Saved Sucessfully!" });
    }
  });
});

router.put("/", (req, res) => {
  const body = req.body;
  const order_id = body.order_id;
  const item_code = body.item_code;
  const order_qty = body.order_qty;

  var query =
    "UPDATE order_detail SET order_qty=? WHERE order_id=? AND item_code=?";
  connection.query(query, [order_qty, order_id, item_code], (err, result) => {
    if (err) throw err;

    if (result.affectedRows) {
      res.send({ message: "Details Updated Successfully!" });
    } else {
      res.send({ message: "No Any Order Details" });
    }
  });
});

router.delete("/", (req, res) => {
  const body = req.body;
  const order_id = body.order_id;
  const item_code = body.item_code;
  var query = "DELETE FROM order_detail WHERE order_id=? AND item_code=?";

  connection.query(query, [order_id, item_code], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({ message: "Details Deleted Successfully!" });
    } else {
      res.send({ message: "Details Not Found" });
    }
  });
});

module.exports = router;
