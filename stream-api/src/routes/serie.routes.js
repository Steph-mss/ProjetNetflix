const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serie.controller');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');
const { validator, serieSchema } = require('../middlewares/validator');

router.get('/', serieController.getSeries);
router.get('/:id', serieController.getSerieById);
router.post('/', auth, roles(['admin']), validator(serieSchema), serieController.createSerie);
router.put('/:id', auth, roles(['admin']), validator(serieSchema), serieController.updateSerie);
router.delete('/:id', auth, roles(['admin']), serieController.deleteSerie);

module.exports = router;
