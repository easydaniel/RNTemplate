import { combineReducers } from 'redux';

import base from './base';
import counter from './counter';
import todo from './todo';

export default combineReducers({
  base,
  counter,
  todo,
});
