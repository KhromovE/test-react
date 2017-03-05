import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(browserHistory), sagaMiddleware];

const store = createStore(
  combineReducers({
    routing: routerReducer,
    ...reducers,
  }),
  compose(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
