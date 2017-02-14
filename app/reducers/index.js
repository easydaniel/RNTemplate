import { combineReducers } from 'redux';

import base from './base';
import counter from './counter';

export default combineReducers({
  base,
  counter,
});
