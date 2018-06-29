import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl-redux';
import { injectGlobal } from 'styled-components';
import client from './apollo/ApolloClient';
import { initLocale } from './redux/reducers/intl/intlActions';
import store, { history } from './redux/store';
import CatchError from './Error';
import RootContainer from './containers/RootContainer';
/* GLobal Styles */
import theme from './styles/theme';





const App = () => {
  store.dispatch(initLocale());
  // Global style
  injectGlobal([
    `
      *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html, body{
        width: 100%;
        height: 100%;
        font-family: 'Roboto', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-size: ${theme.fontSize.normal};
      }
      a { color: ${theme.color.link}; }
    `,
  ]);
  return (
    <CatchError>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <IntlProvider intlSelector={state => state.get('intl').toJS()}>
            <ConnectedRouter history={history}>
              <RootContainer />
            </ConnectedRouter>
          </IntlProvider>
        </Provider>
      </ApolloProvider>
    </CatchError>
  );
};

export default App;
