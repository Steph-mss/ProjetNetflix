const Favoris = require("../models/Favoris.mongo");
const prisma = require("../config/postgres"); 

const getFavorisByUserId = async (userId) => {
  
  const favorisEntries = await Favoris.find({ userId: parseInt(userId) });

  if (favorisEntries.length === 0) {
    return []; 
  }

 
  const filmIds = favorisEntries
    .filter(fav => fav.type === 'Film')
    .map(fav => fav.sqlId);
  const serieIds = favorisEntries
    .filter(fav => fav.type === 'Serie')
    .map(fav => fav.sqlId);

 
  const [films, series] = await Promise.all([
    prisma.film.findMany({ where: { id: { in: filmIds } } }),
    prisma.serie.findMany({ where: { id: { in: serieIds } } })
  ]);

  
  const populatedFavorites = favorisEntries.map(fav => {
    let contentData = null;
    if (fav.type === 'Film') {
      contentData = films.find(f => f.id === fav.sqlId);
    } else {
      contentData = series.find(s => s.id === fav.sqlId);
    }

    if (!contentData) return null; 

    
    return {
      _id: fav._id,     
      type: fav.type,   
      ...contentData    
    };
  }).filter(Boolean); 

  return populatedFavorites;
};

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


const removeFavori = async (id) => {
  return await Favoris.findByIdAndDelete(id);
};

module.exports = {
  getFavorisByUserId,
  addFavori,
  removeFavori,
};  