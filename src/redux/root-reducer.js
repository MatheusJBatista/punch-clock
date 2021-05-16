import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux'

import punchClock from './punch-clock/punch-clock-reducer'
import error from './error/error-reducer'
import requesting from './requesting/requesting-reducer'

const RootReducer = history => {
  const reducerMap = {
    router: connectRouter(history),
    error,
    requesting,
    punchClock,
  }

  return combineReducers(reducerMap)
}

export default RootReducer
