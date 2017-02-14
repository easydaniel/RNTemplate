import { handleActions } from 'redux-actions';

const initialState = {
  list: [],
};

export default handleActions({
  ADD_ITEM: {
    next(state, action) {
      const newItem = {
        id: state.list.length + 1,
        title: action.payload,
        completed: false,
      };
      return {
        ...state,
        list: state.list.concat([newItem]),
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  TOGGLE_ITEM: {
    next(state, action) {
      return {
        ...state,
        list: state.list.map(
          item => (item.id === action.payload ? { ...item, completed: !item.completed } : item)),
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
        list: [],
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
