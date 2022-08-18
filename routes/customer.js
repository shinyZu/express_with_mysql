const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

const connection = require("../configs/db.configs");

router.get("/", (req, res) => {
  var query_getAll = "SELECT * FROM customer";
  connection.query(query_getAll, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  var query = "SELECT * FROM customer WHERE customer_id=?";
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const id = body.customer_id;
  const name = body.customer_name;
  const address = body.customer_address;
  const contact = body.contact_no;

  var query =
    "INSERT INTO customer (customer_id, customer_name , customer_address, contact_no) VALUES (?,?,?,?)";

  //   connection.query(query, [parameters], function to run if query executed);
  connection.query(query, [id, name, address, contact], (err) => {
    if (err) {
      res.send({ message: "Customer Already exists with id : " + id });
    } else {
      res.send({ message: "Customer Saved Sucessfully!" });
    }
  });
});

router.put("/", (req, res) => {
  const body = req.body;
  const id = body.customer_id;
  const name = body.customer_name;
  const address = body.customer_address;
  const contact = body.contact_no;

  // TODO: Duplicate Contact

  var query =
    "UPDATE customer SET customer_name=?, customer_address=?, contact_no=? WHERE customer_id=?";
  connection.query(query, [name, address, contact, id], (err, result) => {
    if (err) throw err;

    if (result.affectedRows) {
      res.send({ message: "Customer Updated Successfully!" });
    } else {
      res.send({ message: "Customer Not Found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  var query = "DELETE FROM customer WHERE customer_id=?";

  connection.query(query, [id], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({ message: "Customer Deleted Successfully!" });
    } else {
      res.send({ message: "Customer Not Found" });
    }
  });
});

module.exports = router;
