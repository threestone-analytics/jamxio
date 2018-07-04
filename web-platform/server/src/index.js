import 'babel-polyfill';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloEngine } from 'apollo-engine';
import compression from 'compression';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './api/schema';
import resolvers from './api/resolvers';
import config from './config/app.config';
import db from './config/db.config';
import loaders from './db/loaders';
import models from './db/models';


console.log(process.env.APOLLO_ENGINE_KEY,"key");

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

app.use('/graphql', bodyParser.json(), graphQLServer);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

if (process.env.APOLLO_ENGINE_KEY) {

  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY,
  })

  engine.listen({
    port: 4000,
    expressApp: app,
  }, () => {
    console.log("GraphQL server with Apollo Engine started");
  });

  
} else {

  app.listen(4000, () => {
    console.log("GraphQL server started"); // eslint-disable-line
  });

}
