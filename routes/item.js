const express = require("express");
const router = express.Router();

const app = express();
app.use(express.json());

router.get("/", (req, res) => {
  res.send("get all items");
});

router.get("/:id", (req, res) => {
  res.send("search item");
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.put("/", (req, res) => {
  res.send(req.body);
});

router.delete("/:id", (req, res) => {
  res.send(req.params.id);
});

module.exports = router;