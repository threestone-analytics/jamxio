import 'babel-polyfill';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import helmet from 'helmet';
import { ApolloEngine } from 'apollo-engine';
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


const port = parseInt(process.env.PORT, 10) || 4000;
const graphQLServer = new GraphQLServer({
  schema,
  context: { models, loaders: loaders() },
});

if (process.env.APOLLO_ENGINE_KEY) {
  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY,
  })

  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: true,
  })

  engine.listen(
    {
      port,
      httpServer,
      graphqlPaths: ['/'],
      endpoint: '/graphql',
      
    },
    () =>
      console.log(
        `Server with Apollo Engine is running on http://localhost:${port}`,
      ),
  )
} else {
  graphQLServer.start(
    {
      port,
    },
    () => console.log(`Server is running on http://localhost:${port}`),
  )
}