import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from '../reducers'


const middleware = [thunk, promiseMiddleware]

const createStoreWithMiddleware = compose(applyMiddleware(...middleware))(createStore)

export default configureStore = (onComplete) => {

  const store = autoRehydrate()(createStoreWithMiddleware)(reducers)

  persistStore(store, { storage: AsyncStorage }, onComplete)

  return store
}
