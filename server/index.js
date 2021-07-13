require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./auth");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/auth/google", (req, res) => {
  passport.authenticate("google", { scope: ["profile"] });
});

app.get("/auth/failed", (req, res) => {
  res.send("Failed to login");
});

app.get("/google/callback", (req, res) => {
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failed",
  });
});

app.get("/protected", (req, res) => {
  res.send("This is a protected page!");
});

app.listen(5000, () => {
  console.log("Server Started!");
});
