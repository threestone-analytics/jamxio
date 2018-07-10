import 'babel-polyfill';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloEngine } from 'apollo-engine';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './api/schema';
import resolvers from './api/resolvers';
import loaders from './db/loaders';
import models from './db/models';
import db from './config/db.config';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphQLServer = graphqlExpress({
  schema,
  context: { models, loaders: loaders() },
});

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json({ limit: '50mb' }), graphQLServer);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

db.connection.on('error', error => {
  console.log(error);
  throw new Error('Unable to connect to database');
});

db.connection.on('connected', () => {
  if (process.env.APOLLO_ENGINE_KEY) {
    const engine = new ApolloEngine({
      apiKey: process.env.APOLLO_ENGINE_KEY,
    });

    engine.listen(
      {
        port: 4000,
        expressApp: app,
      },
      () => {
        console.log('GraphQL server with Apollo Engine started');
      }
    );
  } else {
    app.listen(4000, () => {
    console.log("GraphQL server started"); // eslint-disable-line
    });
  }
});
