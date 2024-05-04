const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();

//CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

const PORT = process.env.PORT || 8080;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/manny";

// const authRouteController = require("./routes/authRoute");

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 20000 })
  .then((result) => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/auth", authRouteController);

app.use((error, req, res, next) => {
  console.log(error);
  if (error.message === "database_error")
    error = { message: "Database error", status: 500 };
  else if (error.message === "bad_request")
    error = { message: "Bad request", status: 400 };
  else if (error.message === "document_not_found")
    error = { message: "Document not found", status: 404 };
  else if (error.message === "not_authenticated")
    error = { message: "Not authenticated", status: 401 };
  else if (error.message === "document_already_exists")
    error = { message: "Document already exists", status: 409 };
  else error = { message: "Internal server error", status: 500 };

  res.status(error.status).json({ error: error.message });
});

const server = app.listen(PORT, () => {
  console.log("Server is running on :" + PORT);
});
