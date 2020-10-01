require("dotenv/config");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

//Routes
app.get("/hi", (req, res) => {
  res.send("Hi!");
  console.log("hello");
});

app.get("*", (req, res) => {
  res.send("Hello World!!");
});

app.post("/form", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
