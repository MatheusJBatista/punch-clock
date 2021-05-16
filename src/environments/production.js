import environment from './base'
import externalConfig from 'externalConfig'
import merge from 'lodash/merge'

const env = environment()
const productionEnv = merge(env, externalConfig)
export default productionEnv
