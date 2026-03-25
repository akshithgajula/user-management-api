const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("WORKING NOW");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});