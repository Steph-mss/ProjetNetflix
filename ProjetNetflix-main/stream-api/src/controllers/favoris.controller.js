// stream-api/controllers/favorisController.js
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
    // 1. RÉCUPÉRER L'ID DE L'UTILISATEUR CONNECTÉ
    // (Vérifie ton middleware 'auth' si c'est req.user.userId ou req.user.id)
    const userId = req.user.userId; 
    
    // 2. PASSER L'ID ET LE CORPS SÉPARÉMENT
    const favori = await favorisService.addFavori(userId, req.body);
    
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