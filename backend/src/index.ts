import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/graphql';
import resolvers from './resolvers';
import { MONGODB_URL } from './constants';
import mongoose from 'mongoose';
import logger from './utils/logger';

//connect to mongodb
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB.');
  })
  .catch((err) => {
    logger.error(err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    maxFileSize: 1000000,
  },
});

const app = express();
const GRAPHQL_URI = '/graphql';
server.applyMiddleware({ app, path: GRAPHQL_URI });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
