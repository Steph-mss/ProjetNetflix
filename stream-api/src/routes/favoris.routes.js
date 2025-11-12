const express = require('express');
const router = express.Router();
const favorisController = require('../controllers/favoris.controller');
const auth = require('../middlewares/auth');

router.get('/user/:id', auth, favorisController.getFavorisByUserId);
router.post('/', auth, favorisController.addFavori);
router.delete('/:id', auth, favorisController.removeFavori);

module.exports = router;
