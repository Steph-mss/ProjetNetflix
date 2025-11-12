const serieService = require('../services/serie.service');

const getSeries = async (req, res, next) => {
  try {
    const series = await serieService.getSeries();
    res.json(series);
  } catch (error) {
    next(error);
  }
};

const getSerieById = async (req, res, next) => {
  try {
    const serie = await serieService.getSerieById(req.params.id);
    if (!serie) {
      return res.status(404).json({ message: 'Serie not found' });
    }
    res.json(serie);
  } catch (error) {
    next(error);
  }
};

const createSerie = async (req, res, next) => {
  try {
    const serie = await serieService.createSerie(req.body);
    res.status(201).json(serie);
  } catch (error) {
    next(error);
  }
};

const updateSerie = async (req, res, next) => {
  try {
    const serie = await serieService.updateSerie(req.params.id, req.body);
    res.json(serie);
  } catch (error) {
    next(error);
  }
};

const deleteSerie = async (req, res, next) => {
  try {
    await serieService.deleteSerie(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteSerie,
};
