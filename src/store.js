import { applyMiddleware, createStore } from "redux";

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers'

// const middleWare = applyMiddleware(promiseMiddleware(), logger, thunk);
const middleWare = applyMiddleware(promiseMiddleware(), thunk);
const store = createStore(reducer, middleWare);

export default store;