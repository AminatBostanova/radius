import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import allProperties from './allProperties'
import singleProperty from './singleProperty'
import user from './user'

const reducer = combineReducers({
  allProperties,
  singleProperty,
  user
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './allProperties'
export * from './singleProperty'
export * from './user'
