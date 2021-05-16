import environment from './base'
import externalConfig from './external-config'
import merge from 'lodash/merge'

console.log(process.env, externalConfig)

const env = environment()
const productionEnv = merge(env, externalConfig)
export default productionEnv
