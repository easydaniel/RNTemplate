import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import reducer from '../reducers';


const middleware = [thunk, promiseMiddleware]

export default compose(applyMiddleware(...middleware))(createStore)(reducer)
