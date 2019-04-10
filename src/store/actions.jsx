import Axios from 'axios';

import { API_URL } from '../config';

import { INITIAL_STATE } from '../store';
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  NEXT_START,
  NEXT_SUCCESS,
  NEXT_ERROR,
} from './actions-types';

export const search = searchKey => async dispatch => {
  dispatch({
    type: SEARCH_START,
    payload: {
      ...INITIAL_STATE,
      isSearching: true,
    },
  });

  const {
    data: { Response, totalResults, Search: searchResults = [], Error = '' },
  } = await Axios.get(`${API_URL}&s=${searchKey}`);

  if (Response === 'False') {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        ...INITIAL_STATE,
        error: Error,
      },
    });
  } else {
    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        ...INITIAL_STATE,
        isSearching: false,
        searchResults,
        totalResults: Number(totalResults),
        searchKey,
        currentPage: 1,
      },
    });
  }
};

export const nextPage = () => async (dispatch, getState) => {
  const { currentPage, searchKey, searchResults } = getState();

  dispatch({
    type: NEXT_START,
    payload: {
      isSearching: true,
    },
  });

  const {
    data: { Response, Search: nextResults = [], Error = '' },
  } = await Axios.get(`${API_URL}&s=${searchKey}&page=${currentPage + 1}`);

  if (Response === 'False') {
    dispatch({
      type: NEXT_ERROR,
      payload: {
        error: Error,
      },
    });
  } else {
    dispatch({
      type: NEXT_SUCCESS,
      payload: {
        isSearching: false,
        searchResults: [...searchResults, ...nextResults],
        currentPage: currentPage + 1,
      },
    });
  }
};
