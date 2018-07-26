import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl-redux';
import createHistory from 'history/createBrowserHistory';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Loadable from 'react-loadable';
import client from '../apollo/ApolloClient';
import { initLocale } from '../store/reducers/intl/intlActions';
import createStore from '../store';

import CatchError from './Error';

/* GLobal Styles */
import '../styles/styles.scss';
import themes from '../styles/theme';
// Global style
injectGlobal([
  `    
    html, body{      
      font-size: ${themes.light.fontSize.normal};
    }
    a { color: ${themes.light.link}; }
  `
]);

const RootContainer = Loadable({
  loader: () => import('../containers/RootContainer'),
  loading: () => <div />,
  delay: 1000
});

const InitApp = () => {
  const history = createHistory();
  const store = createStore(history);
  store.dispatch(initLocale());
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <IntlProvider intlSelector={state => state.get('intl').toJS()}>
          <ConnectedRouter history={history}>
            <ThemeProvider theme={store.getState().getIn(['app', 'user', 'theme', 'selected'])}>
              <CatchError>
                <RootContainer />
              </CatchError>
            </ThemeProvider>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default InitApp;
