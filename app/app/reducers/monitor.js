import { handleActions } from 'redux-actions';
// import { createUDPServer, createTCPServer } from '../api/connection';

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
  // UDPServer: createUDPServer(8080),
  // TCPServer: createTCPServer(8848),
};

export default handleActions({
  ACTION: {
    next(state) {
      return {
        ...state,
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
