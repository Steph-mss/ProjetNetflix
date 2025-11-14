const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Film {
    id: Int!
    titre: String!
    description: String!
    categories: [String]!
    images: [String]!
    dateDeSortie: String!
  }

  type Serie {
    id: Int!
    titre: String!
    description: String!
    categories: [String]!
    images: [String]!
    dateDeSortie: String!
  }

  type Favori {
    id: ID!
    userId: Int!
    type: String!
    sqlId: Int!
    dateAjout: String!
  }

  type Query {
    films: [Film]
    film(id: Int!): Film
    series: [Serie]
    serie(id: Int!): Serie
    favoris(userId: Int!): [Favori]
  }

  type Mutation {
    addFavori(userId: Int!, type: String!, sqlId: Int!): Favori
    removeFavori(id: ID!): Favori
  }
`;

module.exports = { typeDefs };
