const filmService = require('../services/film.service');

const getFilms = async (req, res, next) => {
  try {
    const films = await filmService.getFilms();
    res.json(films);
  } catch (error) {
    next(error);
  }
};

const getFilmById = async (req, res, next) => {
  try {
    const film = await filmService.getFilmById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: 'Film not found' });
    }
    res.json(film);
  } catch (error) {
    next(error);
  }
};

const createFilm = async (req, res, next) => {
  try {
    const film = await filmService.createFilm(req.body);
    res.status(201).json(film);
  } catch (error) {
    next(error);
  }
};

const updateFilm = async (req, res, next) => {
  try {
    const film = await filmService.updateFilm(req.params.id, req.body);
    res.json(film);
  } catch (error) {
    next(error);
  }
};

const deleteFilm = async (req, res, next) => {
  try {
    await filmService.deleteFilm(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
};
