const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const User = require("../../models/User");

// @route     GET /api/auth
// @desc      Get auth user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select("-password");
    const user = await User.findById(req.user.id, "_id username");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST /api/auth/register
// @desc      Register User
// @access    Public
router.post(
  "/register",
  upload.single("profileImg"),
  [
    check("username", "Username is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.file);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, name, email } = req.body;

    try {
      // check if the username exists
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "Username is already taken" }] });
      }

      user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ erros: [{ msg: "Email is already taken" }] });
      }

      // create new user
      user = new User({
        username,
        password,
        name,
        email,
        profileImg: req.file.path,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user to db
      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // { expiresIn: "10h" },
        (err, token) => {
          if (err) return err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route     POST /api/auth/login
// @desc      Login user & get token
// @access    Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        // user not exists
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email and/or password" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // wrong password
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email and/or password" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
