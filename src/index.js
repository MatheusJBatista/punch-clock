import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import Immutable from 'immutable'

import environment from '@environment'

import App from './views/app'
import rootStore from './redux/root-store'
import GoogleAuthProvider from 'context/google-auth-context'

const initialState = Immutable.Map()
const history = createBrowserHistory({ basename: environment.route.baseRoute })
const store = rootStore(initialState, history)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <GoogleAuthProvider>
        <App history={history} />
      </GoogleAuthProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()
