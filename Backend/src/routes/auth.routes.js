const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

const {
  validator,
  registerSchema,
  loginSchema,
} = require("../middlewares/validator");

router.post("/register", validator(registerSchema), authController.register);

router.post("/login", validator(loginSchema), authController.login);

router.post("/refresh", authController.refresh);

router.get("/me", auth, authController.me);

module.exports = router;