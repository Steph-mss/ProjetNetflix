const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const corsOptions = require("./config/cors");
const { globalRateLimiter } = require("./config/rateLimit");

const errorHandler = require("./middlewares/errorHandler");
const { typeDefs, resolvers } = require("./graphql");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const filmRoutes = require("./routes/film.routes");
const serieRoutes = require("./routes/serie.routes");
const favorisRoutes = require("./routes/favoris.routes");

const connectDB = require("./config/mongo"); // ✅ ajout ici

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connexion MongoDB
connectDB();

// GraphQL Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: "/graphql" });
});

// REST API Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/films", filmRoutes);
app.use("/series", serieRoutes);
app.use("/favoris", favorisRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
