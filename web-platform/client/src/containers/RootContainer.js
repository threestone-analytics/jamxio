import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { hot } from 'react-hot-loader';
import RootLayout from '../layouts/RootLayout';

export default hot(module)(
  compose(
    graphql(gql`
      query getCurrentUser {
        me {
          username
        }
      }
    `),
    withProps(({ data: { me, loading } }) => ({
      loggedInUser: me || null,
      loading
    }))
  )(RootLayout)
);
