import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import keywordsReducer from './reducers/keywords'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    keywordsReducer
  })
export default createRootReducer
