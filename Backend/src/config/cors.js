const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
