import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar ObjectId

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Product {
    _id: ObjectId
    code: String!
    name: String!
    description: String!
  }

  input ProductInput {
    _id: ObjectId
    code: String!
    name: String!
    description: String!
  }

  type Query {
    products: [Product]
    hello: String
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    saveProduct(product: ProductInput!): [Product]!
  }
`;

export default typeDefs;
