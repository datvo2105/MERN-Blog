const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_KEY;

module.exports = {
  register: async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const { name, email, password } = req.body;
    try {
      const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const checkEmail = await User.findOne({ email });
      const checkPassword = bcrypt.compareSync(password, checkEmail.password);
      if (!checkEmail)
        throw new Error("Email doesn't exist! Please create account.");
      if (!checkPassword) throw new Error("Wrong password!");
      jwt.sign({ email, id: checkEmail._id }, SECRET, {}, (error, token) => {
        try {
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json("ok");
        } catch (error) {
          throw new Error(error.message);
        }
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  checkLogin: (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, (error, info) => {
      try {
        res.json(info);
      } catch (error) {
        throw new Error(error.message);
      }
    });
  },
  logout: (req, res) => {
    res.cookie("token", "").json("ok");
  },
};
