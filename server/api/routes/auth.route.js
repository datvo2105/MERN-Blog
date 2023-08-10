const { Router } = require("express");
const router = Router();

const {
  register,
  login,
  logout,
  checkLogin,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/login", checkLogin);
router.post("/logout", logout);

module.exports = router;
