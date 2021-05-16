import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import rootStore from '@redux/root-store'

const TemplateComponentTest = ({ children, state = {} }) => {
  const history = createBrowserHistory()
  const store = rootStore(state, history)

  return <Provider store={store}>{children}</Provider>
}

TemplateComponentTest.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object,
}

export default TemplateComponentTest
