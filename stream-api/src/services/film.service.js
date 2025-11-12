const prisma = require('../config/postgres');

const getFilms = async () => {
  return await prisma.film.findMany();
};

const getFilmById = async (id) => {
  return await prisma.film.findUnique({ where: { id: parseInt(id) } });
};

const createFilm = async (data) => {
  return await prisma.film.create({ data });
};

const updateFilm = async (id, data) => {
  return await prisma.film.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteFilm = async (id) => {
  return await prisma.film.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
};
