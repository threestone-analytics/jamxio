import ApolloClient from 'apollo-client';
import { concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const ENDPOINT = process.env.GRAPHQL_SERVER_URL;

const httpLink = createHttpLink({ uri: ENDPOINT });

/* const uploadlink = createUploadLink({
  fetchOptions: {
    credentials: 'same-origin',
    headers: {},
  },
  uri: ENDPOINT,
}); */

const middlewareLink = setContext(() => ({
  headers: {}
}));

const cache = new InMemoryCache({
  dataIdFromObject: result => {
    if (result._id && result.__typename) {
      return result.__typename + result._id;
    }
    return null;
  },
  addTypename: true
});

// Set up cache persistence.
persistCache({
  cache,
  storage: window.localStorage
});

const client = new ApolloClient({
  link: concat(middlewareLink, httpLink),
  cache: cache.restore(window.__APOLLO_CLIENT__),
  connectToDevTools: true,
  queryDeduplication: true
});

export default client;
