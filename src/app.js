const path = require("path");
const express = require("express");
require("./db/mongoose");
const hbs = require("hbs");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(cookieParser());

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/tasks", auth, (req, res) => {
  req.headers("Authorization", `Bearer ${req.cookies}`);
  console.log(req.cookies);
  console.log("lajsfdkl");

  res.render("tasks");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("users/login", (req, res) => {
  res.redirect("/");
});

app.get("users/signup", (req, res) => {
  res.redirect("/");
});

module.exports = app;
