import { routerMiddleware } from 'connected-react-router/immutable'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import rootReducer from './root-reducer'

export default function rootStore(initialState, history) {
  const middleware = [thunk, routerMiddleware(history)].filter(Boolean)
  const composeEnhancers = composeWithDevTools({ trace: true })
  const store = createStore(rootReducer(history), initialState, composeEnhancers(applyMiddleware(...middleware)))
  return store
}
