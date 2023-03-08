require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });