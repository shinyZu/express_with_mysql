const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

router.get("/", (req, res) => {
  res.send("get all order details");
});

router.get("/search", (req, res) => {
  res.send(req.body.order_id + " : " + req.body.item_code);
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.put("/", (req, res) => {
  res.send(req.body);
});

router.delete("/", (req, res) => {
  res.send(req.body.order_id + " : " + req.body.item_code);
});

module.exports = router;
