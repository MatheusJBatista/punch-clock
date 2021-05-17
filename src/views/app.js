import { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

import { ConnectedRouter } from 'connected-react-router/immutable'
import { Route, Switch } from 'react-router-dom'

import RouteEnum from '../constants/RouteEnum'

const PunchClock = lazy(() => import('./punch-clock/punch-clock'))

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Suspense fallback={() => <h1>carregando</h1>}>
        <Switch>
          <Route exact path={RouteEnum.PunchClock} component={PunchClock} />
          <Route exact path={'/callback'} component={() => null} />
          <Route component={() => <h1>Página não encontrada</h1>} />
        </Switch>
      </Suspense>
      <ToastContainer />
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object.isRequired,
}

export default App
