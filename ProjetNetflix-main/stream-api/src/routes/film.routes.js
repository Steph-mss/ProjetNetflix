const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');
const { validator, filmSchema } = require('../middlewares/validator');

router.get('/', filmController.getFilms);

router.get('/:id', filmController.getFilmById);

router.post('/', auth, roles(['admin']), validator(filmSchema), filmController.createFilm);


router.put('/:id', auth, roles(['admin']), validator(filmSchema), filmController.updateFilm);


router.delete('/:id', auth, roles(['admin']), filmController.deleteFilm);

module.exports = router;