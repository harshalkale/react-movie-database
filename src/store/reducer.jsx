import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  NEXT_START,
  NEXT_SUCCESS,
  NEXT_ERROR,
} from './actions-types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SEARCH_START:
    case SEARCH_SUCCESS:
    case SEARCH_ERROR:
    case NEXT_START:
    case NEXT_SUCCESS:
    case NEXT_ERROR:
      return { ...state, ...payload };
    default:
      return state;
  }
};
