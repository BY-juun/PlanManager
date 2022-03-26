import { applyMiddleware, createStore, compose, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { Context, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer, { SagaStore } from "../reducers";
import rootSaga from "../sagas";

const makeStore = (_context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === "development" });

export default wrapper;
