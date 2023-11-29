const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config/db.config.js");
/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/books", require("./routes/books.js"));
app.use("/api/transactions", require("./routes/transactions.js"));
app.use("/api/categories",require("./routes/categories.js"));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port,async () => {
  console.log(`Server is running in PORT ${port}`);
  await dbConnection()
});
