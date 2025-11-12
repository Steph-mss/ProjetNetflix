const favorisService = require('../services/favoris.service');

const getFavorisByUserId = async (req, res, next) => {
  try {
    const favoris = await favorisService.getFavorisByUserId(req.params.id);
    res.json(favoris);
  } catch (error) {
    next(error);
  }
};

const addFavori = async (req, res, next) => {
  try {
    const favori = await favorisService.addFavori(req.body);
    res.status(201).json(favori);
  } catch (error) {
    next(error);
  }
};

const removeFavori = async (req, res, next) => {
  try {
    await favorisService.removeFavori(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavorisByUserId,
  addFavori,
  removeFavori,
};
