const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());

// const connection = require("./configs/db.configs");

const customer = require("./routes/customer");
const item = require("./routes/item");
const orders = require("./routes/orders");
const order_detail = require("./routes/order_detail");

app.use("/customer", customer);
app.use("/items", item);
app.use("/orders", orders);
app.use("/order_detail", order_detail);

app.get("/", (req, res) => {
  res.send("<h1>Express With MySQL</h1>");
});

app.listen(port, (req, res) => {
  console.log(`express app is listening on / starting on port : ${port}`);
});
