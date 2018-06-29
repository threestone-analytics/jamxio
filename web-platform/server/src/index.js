import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import { Engine } from 'apollo-engine';
import compression from 'compression';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './api/schema';
import resolvers from './api/resolvers';
import config from './config/app.config';
import db from './config/db.config';
import loaders from './db/loaders';
import models from './db/models';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const server = new GraphQLServer({
  schema,
  context: { models, loaders: loaders() },
});

const engine = new Engine({
  engineConfig: { apiKey: config.APOLLO_ENGINE_KEY },
  endpoint: '/',
  graphqlPort: parseInt(config.PORT, 10) || 4000,
});
engine.start();


// Enable gzip compression
// ref: https://www.apollographql.com/docs/engine/setup-node.html#enabling-compression
server.express.use(compression());
server.express.use(helmet());
server.express.use(engine.expressMiddleware());

// Throw error if database connection fails
db.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

db.connection.on('connected', () => {
  server.start(
    {
      port: parseInt(config.PORT, 10) || 4000,
      endpoint: '/',
      playground: '/',
      tracing: true,
      cacheControl: true,
      validationRules: [],
    },
    () => {
      console.log('Server is running on localhost:8000'); // eslint-disable-line no-console
    }
  );
});