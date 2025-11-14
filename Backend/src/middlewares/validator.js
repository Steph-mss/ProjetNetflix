const { body, validationResult } = require('express-validator');

const validator = (schema) => [
  ...schema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const registerSchema = [
  body('nom').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

const loginSchema = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

const filmSchema = [
    body('titre').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('categories').isArray(),
    body('images').isArray(),
    body('dateDeSortie').isISO8601(),
];

const serieSchema = [
    body('titre').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('categories').isArray(),
    body('images').isArray(),
    body('dateDeSortie').isISO8601(),
];


module.exports = {
  validator,
  registerSchema,
  loginSchema,
  filmSchema,
  serieSchema,
};
