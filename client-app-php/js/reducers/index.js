import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import todos from './todos'
import lang from './lang'

export default combineReducers({
  routing,
  lang,
  todos
})
