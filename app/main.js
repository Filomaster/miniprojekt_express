const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const router = require("./router");

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`);
});