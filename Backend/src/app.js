const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDef.js'); 

const corsOptions = require("./config/cors");
const { globalRateLimiter } = require("./config/rateLimit");

const errorHandler = require("./middlewares/errorHandler");
const { typeDefs, resolvers } = require("./graphql");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const filmRoutes = require("./routes/film.routes");
const serieRoutes = require("./routes/serie.routes");
const favorisRoutes = require("./routes/favoris.routes");


const { mongoose } = require("./config/mongo"); 


const app = express();


app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: "/graphql" });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));


app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/films", filmRoutes);
app.use("/series", serieRoutes);
app.use("/favoris", favorisRoutes);

app.use(errorHandler);

module.exports = app;