// Package Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const router = require("./src/routes/api");

// Security Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health API
app.get("/", (req, res) => {
  res.status(200).send("Edujar LMS API: All is Well");
});

// Routes
app.use("/api/v1", router);

// Exports
module.exports = app;
