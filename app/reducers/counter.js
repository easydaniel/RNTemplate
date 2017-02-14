import { handleActions } from 'redux-actions';

const initialState = {
  count: 0,
};

export default handleActions({
  INCREASE: {
    next(state) {
      return {
        ...state,
        count: state.count + 1,
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  DECREASE: {
    next(state) {
      return {
        ...state,
        count: state.count - 1,
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  RESET: {
    next(state) {
      return {
        ...state,
        count: 0,
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  default: state => ({
    ...state,
  }),
}, initialState);
