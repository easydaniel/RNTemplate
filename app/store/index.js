import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import reducer from '../reducers';


const middleware = [thunk, promiseMiddleware]

const configureStore = compose(
        applyMiddleware(...middleware)
      )(createStore)

const store = configureStore(reducer)

export default store
