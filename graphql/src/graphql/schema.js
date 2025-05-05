//this file will tell what will be the structure of your data

const { gql } = require("graphql-tag");

// ID means unique identifier
// ! means it is a required field
// String means it is a string
// Float means it is a number
// Boolean means it is a boolean

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String!
    category: String!
    price: Float!
    inStock: Boolean!
  }

  type Error {
    message: String!
  }

  union ProductResult = Product | Error

  type Query {
    products: [Product!]!
    product(id: ID!): ProductResult
  }

  type Mutation {
    createProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      inStock: Boolean!
    ): Product

    deleteProduct(id: ID!): String
    updateProduct(
      id: ID!
      title: String
      description: String
      category: String
      price: Float
      inStock: Boolean
    ): Product
  }
`;      

module.exports = typeDefs;