import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import {KEYS} from '../settings'

export const history = createBrowserHistory()

const persistConfig = {
  key: KEYS.persistKey,
  storage,
  blacklist: ['routing']
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export const store = createStore(persistedReducer, composedEnhancers)

export const persistor = persistStore(store)
