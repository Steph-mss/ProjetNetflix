const app = require('./app'); // L'application Express
const { connectDB } = require('./config/mongo'); // La fonction de connexion

const PORT = process.env.PORT || 4000;

// On crée une fonction 'startServer' pour utiliser 'await'
const startServer = async () => {
  try {
    // 1. On ATTEND que la connexion à MongoDB soit réussie
    await connectDB(); 

    // 2. SEULEMENT SI la BDD est connectée, on lance le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
    
  } catch (error) {
    console.error("Échec du démarrage du serveur", error);
    process.exit(1);
  }
};

// On lance le démarrage
startServer();