const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
// const {
//   sendWelcomeEmail,
//   sendCancellationEmail,
// } = require("../emails/account");

router.post("/users/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // res.send({ user: user.getPublicProfile(), token });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
    });
    res.send({ user, token });
    console.log(req.cookies.jwt);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // req.user.tokens = req.user.tokens.filter((token) => {
    //   return token.token !== res.token;
    // });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    req.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  //     try {
  //     const users = await User.find({});
  //     res.send(users);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
});

router.patch("/users/me", auth, async (req, res) => {
  // router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "age", "password"];

  const isOperationValid = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isOperationValid) {
    return res.status(400).send({ error: "Invalid update" });
  }

  //   const _id = req.params.id;

  try {
    // const user = await User.findById(_id);

    updates.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // // });
    // if (!user) {
    //   return res.status(404).send();
    // }
    res.send(req.user);
  } catch (e) {
    return res.status(400).send(e);
  }
});
// router.delete("/users/:id", async (req, res) => {
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);

    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    // sendCancellationEmail(req.user.email, req.user.name);
    return res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a pdf file"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({
      error:
        "Please upload a image file of type .jpg,.jpeg or .png (Should not exceed limit of 1mb)",
    });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
