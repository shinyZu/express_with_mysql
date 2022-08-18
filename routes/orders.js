const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const connection = require("../configs/db.configs");

router.get("/", (req, res) => {
  var query_getAll = "SELECT * FROM orders";
  connection.query(query_getAll, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  var query = "SELECT * FROM orders WHERE order_id=?";
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const order_id = body.order_id;
  const order_date = body.order_date;
  const order_cost = body.order_cost;
  const customer_id = body.customer_id;

  var query =
    "INSERT INTO orders (order_id, order_date, order_cost, customer_id) VALUES (?,?,?,?)";

  connection.query(
    query,
    [order_id, order_date, order_cost, customer_id],
    (err) => {
      if (err) {
        res.send({ message: "Order Already exists with id : " + order_id });
      } else {
        res.send({ message: "Order Placed Sucessfully!" });
      }
    }
  );
});

router.put("/", (req, res) => {
  const body = req.body;
  const order_id = body.order_id;
  const order_date = body.order_date;
  const order_cost = body.order_cost;
  const customer_id = body.customer_id;

  var query =
    "UPDATE orders SET order_date=?, order_cost=?, customer_id=? WHERE order_id=?";
  connection.query(
    query,
    [order_date, order_cost, customer_id, order_id],
    (err, result) => {
      if (err) throw err;

      if (result.affectedRows) {
        res.send({ message: "Order Updated Successfully!" });
      } else {
        res.send({ message: "Order Not Found" });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  var query = "DELETE FROM orders WHERE order_id=?";

  connection.query(query, [id], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({ message: "Order Deleted Successfully!" });
    } else {
      res.send({ message: "Order Not Found" });
    }
  });
});

module.exports = router;
