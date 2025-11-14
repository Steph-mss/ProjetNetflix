const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../config/postgres");
const { loginRateLimiter } = require("../config/rateLimit");

const register = async (req, res, next) => {
  try {
    const { nom, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        nom,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = [
  loginRateLimiter,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
];

const refresh = (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ accessToken });
  });
};

const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  me,
};
