const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

const customer = require("./routes/customer");
const item = require("./routes/item");
const orders = require("./routes/orders");
const order_detail = require("./routes/order_detail");

app.use("/customer", customer);
app.use("/items", item);
app.use("/orders", orders);
app.use("/order_detail", order_detail);

//------- Creating MySQL Database Connection ------------

const mysql = require("mysql");
const db = require("./configs/db.configs");
const connection = mysql.createConnection(db.database);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully Connected to express_mysql database");

    // Create Customer Table
    var query_customerTable =
      "CREATE TABLE IF NOT EXISTS customer (customer_id VARCHAR(255) PRIMARY KEY, customer_name VARCHAR(255), customer_address VARCHAR(255), contact_no INT)";

    connection.query(query_customerTable, (err, result) => {
      if (err) throw err;

      if (result.warningCount === 0) {
        console.log("Customer Table created");
      }
    });

    // Create Item Table
    var query_itemTable =
      "CREATE TABLE IF NOT EXISTS item (item_code VARCHAR(255) PRIMARY KEY, description VARCHAR(255), unit_price DOUBLE, qty INT)";

    connection.query(query_itemTable, (err, result) => {
      if (err) throw err;

      if (result.warningCount === 0) {
        console.log("Item Table created");
      }
    });

    // Create Orders Table
    var query_orderTable =
      "CREATE TABLE IF NOT EXISTS orders (order_id VARCHAR(255) PRIMARY KEY, order_date VARCHAR(255), order_cost DATE, customer_id VARCHAR(255), CONSTRAINT FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE)";

    connection.query(query_orderTable, (err, result) => {
      if (err) throw err;

      if (result.warningCount === 0) {
        console.log("Orders Table created");
      }
    });

    // Create OrderDetail Table
    var query_orderDetailTable =
      "CREATE TABLE IF NOT EXISTS order_detail (order_id VARCHAR(255), item_code VARCHAR(255), order_qty INT, CONSTRAINT PRIMARY KEY (order_id, item_code), CONSTRAINT FOREIGN KEY (item_code) REFERENCES item(item_code) ON DELETE CASCADE ON UPDATE CASCADE)";

    connection.query(query_orderDetailTable, (err, result) => {
      if (err) throw err;

      if (result.warningCount === 0) {
        console.log("OrderDetail Table created");
      }
    });
  }
});

//-------------------------------------------------------

app.get("/", (req, res) => {
  res.send("<h1>Express With MySQL</h1>");
});

app.listen(port, (req, res) => {
  console.log(`express app is listening on / starting on port : ${port}`);
});
