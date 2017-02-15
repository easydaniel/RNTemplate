import { handleActions } from 'redux-actions';

const initialState = {
  count: 0,
};

export default handleActions({
  ACTION: {
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
  default: state => ({
    ...state,
  }),
}, initialState);
