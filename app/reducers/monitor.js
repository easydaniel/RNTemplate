import { handleActions } from 'redux-actions';
import { createUDPServer } from '../api/connection';

const initialState = {
  devices: [
    {
      mac: '110912556677',
      ip: '192.168.100.2',
    },
    {
      mac: '110912556678',
      ip: '192.168.100.9',
    },
  ],
  search: [],
};

export default handleActions({
  ADD: {
    next(state, action) {
      return {
        ...state,
        devices: state.devices.concat([action.payload]),
        search: state.search.filter(device => (device.mac !== action.payload.mac)),
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
      return {
        ...state,
        search: state.search.concat([action.payload]),
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
