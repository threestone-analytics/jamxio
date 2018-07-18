import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';
import getInitialState from './initialState';
import rootReducer from './reducers';
import rootLogics from './logics';

export default history => {
  // config redux-logic

  const deps = {
    // optional injected dependencies for logic
    // anything you need to have available in your logic
  };

  const logicMiddleware = createLogicMiddleware(rootLogics, deps);

  // create a redux store by providing reducers and middleware
  // we use devToolsEnhancer which lets us add redux devtools at some point.

  const middlewares = [logicMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // create store
  const store = createStore(
    connectRouter(history)(rootReducer),
    fromJS(getInitialState()),
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers)
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line      
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
