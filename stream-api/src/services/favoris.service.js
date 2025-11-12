const Favoris = require("../models/Favoris.mongo");

const getFavorisByUserId = async (userId) => {
  return await Favoris.find({ userId: parseInt(userId) });
};

const addFavori = async (data) => {
  const { userId, mediaId, mediaType } = data;

  const favoriData = {
    userId,
    sqlId: mediaId,
    type: mediaType,
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
