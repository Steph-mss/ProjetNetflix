// stream-api/services/favoris.service.js
const Favoris = require("../models/Favoris.mongo");
const prisma = require("../config/postgres"); 

const getFavorisByUserId = async (userId) => {
  // 1. Récupérer les favoris de l'utilisateur (depuis MongoDB)
  const favorisEntries = await Favoris.find({ userId: parseInt(userId) });

  if (favorisEntries.length === 0) {
    return []; // Pas de favoris, on s'arrête là
  }

  // 2. Séparer les ID des films et des séries
  const filmIds = favorisEntries
    .filter(fav => fav.type === 'Film')
    .map(fav => fav.sqlId);
  const serieIds = favorisEntries
    .filter(fav => fav.type === 'Serie')
    .map(fav => fav.sqlId);

  // 3. Récupérer les détails des films/séries (depuis PostgreSQL)
  const [films, series] = await Promise.all([
    prisma.film.findMany({ where: { id: { in: filmIds } } }),
    prisma.serie.findMany({ where: { id: { in: serieIds } } })
  ]);

  // 4. Combiner les données pour le frontend
  const populatedFavorites = favorisEntries.map(fav => {
    let contentData = null;
    if (fav.type === 'Film') {
      contentData = films.find(f => f.id === fav.sqlId);
    } else {
      contentData = series.find(s => s.id === fav.sqlId);
    }

    if (!contentData) return null; // Le film/série a été supprimé

    // On retourne un objet qui a l'ID de Mongo ET les données du film
    return {
      _id: fav._id,     // <-- L'ID de Mongo (pour la suppression)
      type: fav.type,   // <-- Le type (Film/Serie)
      ...contentData    // <-- Le reste des données (id, titre, images...)
    };
  }).filter(Boolean); // Retire les 'null' (favoris corrompus)

  return populatedFavorites;
};

// addFavori (inchangé par rapport à notre dernière version)
const addFavori = async (userId, data) => {
  const { mediaId, mediaType } = data;
  if (!userId || !mediaId || !mediaType) {
    throw new Error("Données manquantes (userId, mediaId, mediaType)");
  }
  let content;
  if (mediaType === 'Film') {
    content = await prisma.film.findUnique({ where: { id: Number(mediaId) } });
  } else if (mediaType === 'Serie') {
    content = await prisma.serie.findUnique({ where: { id: Number(mediaId) } });
  }
  if (!content) {
    throw new Error(`Contenu ${mediaType} avec ID ${mediaId} introuvable.`);
  }
  const favoriData = {
    userId: userId, sqlId: mediaId, type: mediaType,
  };
  const favori = new Favoris(favoriData);
  return await favori.save();
};

// removeFavori (inchangé)
const removeFavori = async (id) => {
  return await Favoris.findByIdAndDelete(id);
};

module.exports = {
  getFavorisByUserId,
  addFavori,
  removeFavori,
};  