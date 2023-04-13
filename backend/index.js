const express = require("express");
const color = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const connectMQTT = require("./mqtt/handleMQTT")
const bodyParser=require("body-parser")
const port = process.env.PORT || 5000;

connectDB();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/notiRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
