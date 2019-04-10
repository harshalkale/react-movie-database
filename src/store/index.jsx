import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

export const INITIAL_STATE = {
  error: '',
  isSearching: false,
  searchResults: [],
  totalResults: 0,
  searchKey: '',
  currentPage: 0,
};

export default createStore(
  rootReducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
