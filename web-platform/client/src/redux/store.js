import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import devToolsEnhancer from 'remote-redux-devtools';
import { createLogicMiddleware } from 'redux-logic';
import getInitialState from './initialState';
import rootReducer from './reducers';
import rootLogics from './logics';

// config redux-logic

const deps = {
  // optional injected dependencies for logic
  // anything you need to have available in your logic
};

const logicMiddleware = createLogicMiddleware(rootLogics, deps);

// create a redux store by providing reducers and middleware
// we use devToolsEnhancer which lets us add redux devtools at some point.

export const history = createHistory();

const middlewares = [logicMiddleware, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)];

/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV !== 'production') {
  enhancers.push(devToolsEnhancer({ suppressConnectErrors: false }));
}
/* eslint-enable */

// create store

const store = createStore(rootReducer, fromJS(getInitialState()), compose(...enhancers));

if (process.env.NODE_ENV === 'development') {
  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers'); // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }
}

export default store;
