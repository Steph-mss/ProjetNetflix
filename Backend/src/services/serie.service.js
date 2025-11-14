const prisma = require('../config/postgres');

const getSeries = async () => {
  return await prisma.serie.findMany();
};

const getSerieById = async (id) => {
  return await prisma.serie.findUnique({ where: { id: parseInt(id) } });
};

const createSerie = async (data) => {
  return await prisma.serie.create({ data });
};

const updateSerie = async (id, data) => {
  return await prisma.serie.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteSerie = async (id) => {
  return await prisma.serie.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  getSeries,
  getSerieById,
  createSerie,
  updateSerie,
  deleteSerie,
};
