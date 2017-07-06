import { handleActions } from 'redux-actions';
import { createUDPServer } from '../api/connection';

const initialState = {
  devices: [
  ],
  search: [],
};

export default handleActions({
  ADD: {
    next(state, action) {
      var found = false;
      state.devices.forEach(function(item) {
        if (item.mac === action.payload.mac) {
          found = true;
        }
      })
      return {
        ...state,
        devices: found ? state.devices : state.devices.concat([action.payload]),
        search: [],
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  REMOVE: {
    next(state, action) {
      return {
        ...state,
        devices: state.devices.filter(device => (device.mac !== action.payload.mac)),
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  NEW_DEVICE: {
    next(state, action) {
      var found = false;
      state.search.forEach(function(item) {
        if (item.mac === action.payload.mac) {
          found = true;
        }
      })
      return {
        ...state,
        search: found ? state.search : state.search.concat([action.payload]),
      };
    },
    throw(state) {
      return {
        ...state,
      };
    },
  },
  INIT_SEARCH: {
    next(state, action) {
      return {
        ...state,
        search: [],
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
