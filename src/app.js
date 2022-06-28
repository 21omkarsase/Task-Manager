const path = require("path");
const express = require("express");
require("./db/mongoose");
const hbs = require("hbs");
const User = require("./models/user");
const Task = require("./models/task");
const Contact = require("./models/contact");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  const jwt = req.cookies.jwt;
  if (jwt) {
    res.render("mytasks");
  } else {
    res.render("index");
  }
});

app.get("/user/mytasks", auth, (req, res) => {
  res.render("mytasks");
});

app.get("/contact", auth, (req, res) => {
  res.render("contact");
});

//contact route
app.post("/contact/submit", auth, async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.send(req.contact);
  } catch (e) {
    res.send({ error: "opeation failed", e });
  }
});

// user routes start
app.post("/users/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
      // secure:true
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Authenticaion failed" });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3000000),
      httpOnly: true,
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Authenticaion failed" });
  }
});

app.post("/users/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.post("/users/logoutAll", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.user.tokens = [];
    await req.user.save();
    req.send();
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

app.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

app.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "age", "password"];

  const isOperationValid = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isOperationValid) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    return res.status(400).send({ error: "User update failed" });
  }
});

app.delete("/users/me", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    await req.user.remove();
    return res.send(req.user);
  } catch (e) {
    res.status(400).send({ error: "Delete user failed" });
  }
});

//user routes end

//task routes start
app.post("/user/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send({ error: "No Tasks Found" });
  }
});

app.get("/user/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send({ error: "Create task failed" });
  }
});

app.get("/user/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Task not found" });
  }
});

app.patch("/user/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["task", "due", "description", "completed"];
  const isOperationValid = updates.every((update) => {
    return allowedUpdate.includes(update);
  });

  if (!isOperationValid) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send({ error: "Can't update task!" });
  }
});

app.delete("/user/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send({ error: "Update task failed" });
  }
});

// task routes end

module.exports = app;
