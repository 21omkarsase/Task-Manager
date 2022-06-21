const path = require("path");
const express = require("express");
require("./db/mongoose");
const hbs = require("hbs");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/users", (req, res) => {
  res.render("users");
});

module.exports = app;
