import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.listen(4000, () => {
  console.log("GraphQL server started"); // eslint-disable-line
});
