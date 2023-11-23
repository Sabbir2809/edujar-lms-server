// Package Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require("./src/routes/api");

// Security Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

// Health API
app.get("/", (req, res) => {
  res.status(200).send("Edujar LMS API: All is Well");
});

// Exports
module.exports = app;
