const app = require('./app'); 
const { connectDB } = require('./config/mongo'); 

const PORT = process.env.PORT || 4000;


const startServer = async () => {
  try {
    
    await connectDB(); 

    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
    
  } catch (error) {
    console.error("Échec du démarrage du serveur", error);
    process.exit(1);
  }
};


startServer();