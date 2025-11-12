const filmService = require("../services/film.service");
const serieService = require("../services/serie.service");
const favorisService = require("../services/favoris.service");

const resolvers = {
  Query: {
    films: () => filmService.getFilms(),
    film: (_, { id }) => filmService.getFilmById(id),
    series: () => serieService.getSeries(),
    serie: (_, { id }) => serieService.getSerieById(id),
    favoris: (_, { userId }) => favorisService.getFavorisByUserId(userId),
  },
  Mutation: {
    addFavori: (_, { userId, type, sqlId }) =>
      favorisService.addFavori({ userId, type, sqlId }),
    removeFavori: (_, { id }) => favorisService.removeFavori(id),
  },
};

module.exports = { resolvers };
